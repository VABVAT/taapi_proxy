/**
 * Walk `error.cause` (Node/undici fetch failures) and return a readable line for logs + API clients.
 * @param {unknown} err
 */
export function serializeNodeFetchError(err) {
  const parts = []
  let cur = err
  let depth = 0
  while (cur != null && depth < 8) {
    depth += 1
    if (cur instanceof Error) {
      const bits = [cur.name || 'Error', cur.message].filter(Boolean)
      /** @type {Error & { code?: string, errno?: number, syscall?: string, address?: string, port?: number }} */
      const e = cur
      if (e.code) bits.push(`code=${e.code}`)
      if (typeof e.errno === 'number') bits.push(`errno=${e.errno}`)
      if (e.syscall) bits.push(`syscall=${e.syscall}`)
      if (e.address) bits.push(`address=${e.address}`)
      if (typeof e.port === 'number') bits.push(`port=${e.port}`)
      parts.push(bits.join(' '))
      cur = e.cause
    } else if (typeof cur === 'object') {
      try {
        parts.push(JSON.stringify(cur))
      } catch {
        parts.push(String(cur))
      }
      break
    } else {
      parts.push(String(cur))
      break
    }
  }
  return parts.join(' → ')
}

/**
 * Human message for JSON `error` field (no stack).
 * @param {unknown} err
 */
export function publicErrorMessage(err) {
  if (!(err instanceof Error)) {
    return String(err)
  }
  const chain = serializeNodeFetchError(err)
  if (err.message === 'fetch failed') {
    return chain
  }
  return err.message || chain
}

/**
 * Redact `secret` query param for safe logs.
 * @param {string} urlString
 */
export function redactUrlForLog(urlString) {
  try {
    const u = new URL(urlString)
    if (u.searchParams.has('secret')) {
      u.searchParams.set('secret', '(redacted)')
    }
    return u.toString()
  } catch {
    return String(urlString || '').replace(/([?&])secret=[^&]*/gi, '$1secret=(redacted)')
  }
}

/**
 * @param {string} tag
 * @param {unknown} err
 * @param {Record<string, unknown>} [extra]
 */
export function logProxyError(tag, err, extra) {
  const message = err instanceof Error ? err.message : String(err)
  const chain = err instanceof Error ? serializeNodeFetchError(err) : ''
  const stack = err instanceof Error ? err.stack : undefined
  console.error(`[${tag}] ${message}`)
  if (chain && chain !== message) {
    console.error(`[${tag}] cause chain:`, chain)
  }
  if (extra && Object.keys(extra).length > 0) {
    console.error(`[${tag}] context`, extra)
  }
  if (stack) {
    console.error(stack)
  }
}

/**
 * @param {import('express').Response} res
 * @param {number} status
 * @param {string} tag
 * @param {unknown} err
 * @param {Record<string, unknown>} [extra] merged into JSON body (no secrets)
 */
export function sendProxyJsonError(res, status, tag, err, extra) {
  const message = publicErrorMessage(err)
  logProxyError(tag, err, extra)
  const body = { error: message, ...(extra && typeof extra === 'object' ? extra : {}) }
  res.status(status).json(body)
}
