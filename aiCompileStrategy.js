import { buildAiStrategyCompilerSystemPrompt } from './context.js'
import { logProxyError } from './proxyDiagnostics.js'

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

/** @param {string} text */
export function parseJsonFromLlmText(text) {
  const trimmed = String(text || '').trim()
  const fence = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/m)
  const body = fence ? fence[1].trim() : trimmed
  return JSON.parse(body)
}

/** Demo strategy when OPENAI_API_KEY is unset - VWAP mean-reversion long+short example. */
export function mockCompiledStrategyEnvelope() {
  const vwapSrc = { type: 'catalog', catalogId: 'vwap', figureKey: 'value', params: {} }
  return {
    version: 1,
    strategy: {
      initialBalance: 10_000,
      startBarIndex: 0,
      endBarIndex: 9_999_999,
      buyRule: {
        source: { type: 'price', field: 'close' },
        op: 'lt',
        rhs: { kind: 'indicatorPct', source: vwapSrc, pct: 99.7 },
      },
      sellRule: {
        source: { type: 'price', field: 'close' },
        op: 'gte',
        rhs: { kind: 'indicator', source: vwapSrc },
      },
      shortRule: {
        source: { type: 'price', field: 'close' },
        op: 'gt',
        rhs: { kind: 'indicatorPct', source: vwapSrc, pct: 100.3 },
      },
      shortSellRule: {
        source: { type: 'price', field: 'close' },
        op: 'lte',
        rhs: { kind: 'indicator', source: vwapSrc },
      },
      exits: [
        { kind: 'stopLossPct', pct: 0.5 },
        { kind: 'barsHeld', bars: 10 },
      ],
    },
    meta: {
      title: 'Mock VWAP mean-reversion long+short (OPENAI_API_KEY empty)',
      assumptions: [
        'OPENAI_API_KEY is not set - returning a fixed VWAP mean-reversion example.',
        'Long: close < VWAP*0.997; exit when close >= VWAP.',
        'Short: close > VWAP*1.003; cover when close <= VWAP.',
        'Stop-loss 0.5% (auto-inverted for shorts), max 10 bars per trade.',
      ],
      unsupportedRequests: [],
    },
  }
}

/**
 * @param {string} instruction
 * @param {{ apiKey: string, model?: string }} opts
 */
async function compileWithOpenAI(instruction, opts) {
  const model = String(opts.model || process.env.OPENAI_MODEL || 'gpt-4o-mini').trim()
  const systemPrompt = buildAiStrategyCompilerSystemPrompt()
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${opts.apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.15,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Trading strategy (natural language):\n\n${instruction}` },
      ],
    }),
  })
  const text = await res.text()
  if (!res.ok) {
    let msg = (text || res.statusText || '(no body)').trim()
    try {
      const j = JSON.parse(text)
      if (j?.error?.message) {
        msg = String(j.error.message)
        const code = j.error?.code != null ? ` code=${j.error.code}` : ''
        const type = j.error?.type != null ? ` type=${j.error.type}` : ''
        msg = `${msg}${code}${type}`
      } else if (typeof j?.message === 'string') {
        msg = j.message
      }
    } catch {
      // keep raw body as msg
    }
    const err = new Error(`OpenAI HTTP ${res.status}: ${msg}`)
    logProxyError('openai', err, { status: res.status, bodyPreview: text.slice(0, 2000) })
    throw err
  }
  let data
  try {
    data = JSON.parse(text)
  } catch (parseErr) {
    const err = new Error(`OpenAI response is not JSON: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}. Body preview: ${text.slice(0, 500)}`)
    logProxyError('openai', err)
    throw err
  }
  const content = data?.choices?.[0]?.message?.content
  if (typeof content !== 'string' || !content.trim()) {
    const err = new Error(
      `OpenAI returned empty message content. Raw keys: ${data && typeof data === 'object' ? Object.keys(data).join(',') : typeof data}. Preview: ${text.slice(0, 800)}`,
    )
    logProxyError('openai', err)
    throw err
  }
  try {
    return parseJsonFromLlmText(content)
  } catch (parseErr) {
    const err = new Error(
      `Strategy JSON parse failed: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}. Model output preview: ${String(content).slice(0, 1200)}`,
    )
    logProxyError('openai', err)
    throw err
  }
}

/**
 * @param {string} instruction
 */
export async function compileStrategyFromNaturalLanguage(instruction) {
  const key = String(process.env.OPENAI_API_KEY || '').trim()
  if (!key) {
    return mockCompiledStrategyEnvelope()
  }
  return compileWithOpenAI(String(instruction || '').trim(), { apiKey: key })
}
