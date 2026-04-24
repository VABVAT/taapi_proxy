import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { compileStrategyFromNaturalLanguage } from './aiCompileStrategy.js'

dotenv.config()

const PORT = Number(process.env.PORT) || 4010
const TAAPI_SECRET = String(process.env.TAAPI_SECRET || '').trim()
const TAAPI_ORIGIN = 'https://api.taapi.io'

if (!TAAPI_SECRET) {
  console.error('FATAL: Set TAAPI_SECRET in .env (see .env.example)')
  process.exit(1)
}

const app = express()
app.disable('x-powered-by')
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ limit: '5mb' }))

/**
 * Natural language → backtestCharts strategy JSON (via Grok when GROK_API_KEY is set; otherwise mock).
 */
app.post('/ai/compile-strategy', async (req, res) => {
  try {
    const instruction =
      typeof req.body?.instruction === 'string'
        ? req.body.instruction
        : typeof req.body?.prompt === 'string'
          ? req.body.prompt
          : ''
    if (!String(instruction).trim()) {
      res.status(400).json({ error: 'Missing "instruction" (or legacy "prompt") string in JSON body' })
      return
    }
    const envelope = await compileStrategyFromNaturalLanguage(instruction)
    res.status(200).json(envelope)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[ai/compile-strategy]', msg)
    res.status(502).json({ error: msg })
  }
})

/**
 * Forwards to api.taapi.io and injects the server-side secret (GET query + POST JSON body).
 * The browser never needs the Taapi secret when using this proxy.
 */
app.use(async (req, res) => {
  try {
    const pathAndQuery = req.originalUrl || '/'
    const url = new URL(pathAndQuery, `${TAAPI_ORIGIN}/`)
    url.searchParams.delete('secret')
    url.searchParams.set('secret', TAAPI_SECRET)

    if (req.method === 'GET' || req.method === 'HEAD') {
      const upstream = await fetch(url.toString(), {
        method: req.method,
        headers: { accept: 'application/json' },
      })
      res.status(upstream.status)
      const ct = upstream.headers.get('content-type')
      if (ct) {
        res.setHeader('content-type', ct)
      }
      const buf = Buffer.from(await upstream.arrayBuffer())
      res.end(buf)
      return
    }

    if (req.method === 'POST') {
      const body =
        req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)
          ? { ...req.body, secret: TAAPI_SECRET }
          : { secret: TAAPI_SECRET }
      const upstream = await fetch(url.toString(), {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(body),
      })
      const text = await upstream.text()
      res.status(upstream.status).type('application/json').send(text)
      return
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error('[taapi-proxy]', msg)
    res.status(502).json({ error: msg })
  }
})

app.listen(PORT, () => {
  console.log(`taapi proxy → ${TAAPI_ORIGIN} (listening on ${PORT})`)
  console.log(`AI compile → POST http://localhost:${PORT}/ai/compile-strategy`)
})
