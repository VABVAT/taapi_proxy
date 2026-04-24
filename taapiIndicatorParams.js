/**
 * @typedef {{
*   key: string
*   label: string
*   taapiKey: string
*   type: 'int' | 'float'
*   default: number
*   min?: number
*   max?: number
*   step?: number
* }} CatalogParamDef
*/

/** @param {number} d @param {number} min @param {number} max @returns {CatalogParamDef} */
export function periodParam(d = 14, min = 2, max = 200) {
 return {
   key: 'period',
   label: 'Period',
   taapiKey: 'period',
   type: 'int',
   default: d,
   min,
   max,
   step: 1,
 }
}

/**
* @param {import('./taapiIndicatorCatalog.js').TaapiCatalogEntry} entry
* @param {Record<string, string>|undefined} overrides
* @returns {Record<string, string>}
*/
export function defaultParamValues(entry, overrides) {
 /** @type {Record<string, string>} */
 const o = {}
 for (const p of entry.params || []) {
   o[p.key] = String(p.default ?? '')
 }
 if (overrides) {
   for (const [k, v] of Object.entries(overrides)) {
     if (v != null) {
       o[k] = String(v)
     }
   }
 }
 return o
}

/**
* @param {import('./taapiIndicatorCatalog.js').TaapiCatalogEntry} entry
* @param {Record<string, string>} values
*/
export function buildMergedFetchQuery(entry, values) {
 const base = { ...(entry.staticQuery || entry.fetchQuery || {}) }
 const vals = values || {}
 for (const p of entry.params || []) {
   const raw = vals[p.key]
   const str = raw != null && String(raw).trim() !== '' ? String(raw).trim() : String(p.default ?? '')
   if (str !== '') {
     base[p.taapiKey] = str
   }
 }
 return base
}

/**
* @param {import('./taapiIndicatorCatalog.js').TaapiCatalogEntry} entry
* @param {Record<string, string>} paramValues
*/
export function formatIndicatorShortName(entry, paramValues) {
 const merged = defaultParamValues(entry, paramValues)
 const parts = []
 for (const p of entry.params || []) {
   const v = merged[p.key]
   if (v != null && String(v).trim() !== '') {
     parts.push(String(v).trim())
   }
 }
 if (parts.length === 0) {
   return entry.label
 }
 return `${entry.label}(${parts.join(',')})`
}

/**
* @param {CatalogParamDef} def
* @param {string} raw
*/
export function clampParam(def, raw) {
 const s = String(raw ?? '').trim()
 if (s === '') {
   return String(def.default)
 }
 let n = def.type === 'int' ? Math.round(Number(s)) : Number(s)
 if (!Number.isFinite(n)) {
   return String(def.default)
 }
 if (def.min != null) {
   n = Math.max(def.min, n)
 }
 if (def.max != null) {
   n = Math.min(def.max, n)
 }
 return def.type === 'int' ? String(Math.round(n)) : String(n)
}

/**
* @param {import('./taapiIndicatorCatalog.js').TaapiCatalogEntry} entry
* @param {Record<string, string>} raw
*/
export function sanitizeParamValues(entry, raw) {
 /** @type {Record<string, string>} */
 const o = {}
 for (const p of entry.params || []) {
   o[p.key] = clampParam(p, raw?.[p.key] ?? '')
 }
 return o
}
