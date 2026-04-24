import { buildAiStrategyCompilerSystemPrompt } from '../backtestCharts/src/lib/aiStrategyCompilerContext.js'

const GROK_URL = 'https://api.x.ai/v1/chat/completions'

/** @param {string} text */
export function parseJsonFromLlmText(text) {
  const trimmed = String(text || '').trim()
  const fence = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/m)
  const body = fence ? fence[1].trim() : trimmed
  return JSON.parse(body)
}

/** Demo strategy when GROK_API_KEY is unset — matches the canonical Bollinger + TP + bars example. */
export function mockCompiledStrategyEnvelope() {
  return {
    version: 1,
    strategy: {
      initialBalance: 10_000,
      startBarIndex: 0,
      endBarIndex: 1_000_000,
      buyRule: {
        source: { type: 'price', field: 'close' },
        op: 'lt',
        rhs: {
          kind: 'indicator',
          source: { type: 'catalog', catalogId: 'bbands', figureKey: 'lower', params: { period: '20', stddev: '2' } },
        },
      },
      sellRule: {
        source: { type: 'price', field: 'close' },
        op: 'gte',
        rhs: {
          kind: 'indicator',
          source: { type: 'catalog', catalogId: 'bbands', figureKey: 'mid', params: { period: '20', stddev: '2' } },
        },
      },
      exits: [
        { kind: 'takeProfitPct', pct: 2 },
        { kind: 'barsHeld', bars: 20 },
      ],
    },
    meta: {
      title: 'Mock Bollinger long (GROK_API_KEY empty)',
      assumptions: [
        'GROK_API_KEY is not set — returning a fixed example strategy.',
        'sellRule fires before auxiliary exits when both apply on the same bar.',
      ],
      unsupportedRequests: [],
    },
  }
}

/**
 * @param {string} instruction
 * @param {{ apiKey: string, model?: string }} opts
 */
async function compileWithGrok(instruction, opts) {
  const model = String(opts.model || process.env.GROK_MODEL || 'grok-2-latest').trim()
  const systemPrompt = buildAiStrategyCompilerSystemPrompt()
  const res = await fetch(GROK_URL, {
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
    let msg = text || res.statusText
    try {
      const j = JSON.parse(text)
      if (j?.error?.message) msg = j.error.message
    } catch {
      // ignore
    }
    throw new Error(`Grok HTTP ${res.status}: ${msg}`)
  }
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('Grok returned non-JSON')
  }
  const content = data?.choices?.[0]?.message?.content
  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('Grok returned empty content')
  }
  return parseJsonFromLlmText(content)
}

/**
 * @param {string} instruction
 */
export async function compileStrategyFromNaturalLanguage(instruction) {
  const key = String(process.env.GROK_API_KEY || '').trim()
  if (!key) {
    return mockCompiledStrategyEnvelope()
  }
  return compileWithGrok(String(instruction || '').trim(), { apiKey: key })
}
