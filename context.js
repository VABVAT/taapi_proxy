import { FAMOUS_TAAPI_INDICATORS } from './taapiIndicatorCatalog.js'

/**
 * Indicator definitions derived from the live TAAPI catalog (`FAMOUS_TAAPI_INDICATORS`).
 * Use this JSON when calling the LLM so `catalogId`, `figureKey`, and `params` keys match
 * prefetch + `readSignalAt` exactly.
 *
 * @returns {Array<{
 *   catalogId: string
 *   label: string
 *   apiPath: string
 *   figures: Array<{ key: string, title: string }>
 *   params: Array<{ key: string, taapiKey: string, type: string, default: number, min?: number, max?: number }>
 *   staticQuery?: Record<string, string>
 * }>}
 */
export function getAllowedIndicatorsForAiCompiler() {
  return FAMOUS_TAAPI_INDICATORS.map((e) => {
    const row = {
      catalogId: e.id,
      label: e.label,
      apiPath: e.apiPath,
      figures: e.figures.map((f) => ({ key: f.key, title: f.title })),
      params: (e.params || []).map((p) => ({
        key: p.key,
        taapiKey: p.taapiKey,
        type: p.type,
        default: p.default,
        ...(p.min != null ? { min: p.min } : {}),
        ...(p.max != null ? { max: p.max } : {}),
      })),
    }
    if (e.staticQuery && Object.keys(e.staticQuery).length) {
      row.staticQuery = { ...e.staticQuery }
    }
    return row
  })
}

/** Compact JSON string suitable for appending to a Grok user message or storing in proxy config. */
export function getAllowedIndicatorsForAiCompilerJson() {
  return JSON.stringify(getAllowedIndicatorsForAiCompiler())
}

/**
 * Fixed system prompt + authoritative indicator list (from this repo's catalog).
 * @param {{ includeIndicatorCatalog?: boolean }} [opts] — set false to omit catalog here and attach the same JSON from {@link getAllowedIndicatorsForAiCompilerJson} in the user message instead (saves system tokens).
 */
export function buildAiStrategyCompilerSystemPrompt(opts = {}) {
  const include = opts.includeIndicatorCatalog !== false
  if (!include) {
    return `${AI_STRATEGY_COMPILER_SYSTEM_PROMPT_HEAD}

=== AUTHORITATIVE INDICATOR CATALOG ===
The caller will supply CATALOG_JSON in the same conversation. Obey the same rules: catalogId and figureKey must appear in that JSON; param keys must match that entry's params[].key; param values are strings.`
  }
  const catalogJson = getAllowedIndicatorsForAiCompilerJson()
  return `${AI_STRATEGY_COMPILER_SYSTEM_PROMPT_HEAD}

=== AUTHORITATIVE INDICATOR CATALOG (required) ===
The following JSON array is the ONLY source of valid indicator ids. In every SignalSource of type "catalog":
- Set "catalogId" EXACTLY to one of the objects' "catalogId" (lowercase slug, e.g. bbands, rsi). Do not use "apiPath" or human "label" as catalogId unless they are identical to catalogId.
- Set "figureKey" EXACTLY to one of that entry's "figures[].key" values (e.g. bbands → upper, mid, lower).
- Set "params" using ONLY keys listed in that entry's "params[].key". Values MUST be strings (e.g. "20", "2"). Omit params only if the entry's "params" array is empty; otherwise include every key with user-specified or default values from "params[].default".
- If "staticQuery" is present on a catalog entry, those key/value pairs are fixed at fetch time; you do not repeat them inside "params" unless they also appear as param keys.

CATALOG_JSON:
${catalogJson}
`
}

const AI_STRATEGY_COMPILER_SYSTEM_PROMPT_HEAD = `You compile natural-language trading ideas into ONE JSON object for a spot backtest engine that supports long AND short positions. Output JSON only — no markdown, no commentary.

=== MARKET MODEL ===
- One position at a time (long OR short); entry uses all available cash as margin.
- Long: buy at bar close, sell at bar close. Short: sell at bar close (margin model), cover at bar close.
- No pyramiding or partial fills. TP/SL semantics auto-invert for short positions (e.g. takeProfitPct fires when price drops for shorts).
- If the strategy only trades one direction, emit only buyRule + sellRule (+ optional shortRule omitted).

=== EVALUATION ORDER (while in a long position) ===
1) sellRule — if true → exit long ("signal").
2) exits[] — first matching auxiliary exit closes the long.

=== EVALUATION ORDER (while in a short position) ===
1) shortSellRule (or sellRule when shortSellRule is absent) — if true → cover short ("signal").
2) exits[] — first matching auxiliary exit covers the short (TP/SL inverted for shorts).

=== EVALUATION ORDER (no position) ===
1) buyRule — if true → open long.
2) shortRule — if true → open short (only if shortRule is present in the strategy).

=== SIGNAL SOURCES (prefer catalog) ===
Always use { "type": "catalog", "catalogId", "figureKey", "params" } for indicators. Do NOT emit { "type": "indicator", "instanceId", ... } unless the user explicitly supplies chart instance bindings.

Price series: { "type": "price", "field": "close"|"open"|"high"|"low" }

=== CONDITIONS ===
Leaf: { "source": SignalSource, "op": "lt"|"gt"|"lte"|"gte"|"eq"|"crossesAbove"|"crossesBelow", "rhs": Rhs }
Rhs variants:
  { "kind": "number", "value": number }
  { "kind": "indicator", "source": SignalSource }
  { "kind": "indicatorPct", "source": SignalSource, "pct": number }   ← evaluates to (indicator * pct / 100)

PERCENTAGE DEVIATION via indicatorPct:
  "0.3% below VWAP"  → rhs = { "kind": "indicatorPct", "source": vwap, "pct": 99.7 }   (= VWAP * 0.997)
  "0.3% above VWAP"  → rhs = { "kind": "indicatorPct", "source": vwap, "pct": 100.3 }  (= VWAP * 1.003)
  "0.5% below price" → rhs = { "kind": "indicatorPct", "source": price, "pct": 99.5 }
  General rule: N% below X → pct = 100 - N; N% above X → pct = 100 + N.

Group: { "kind": "group", "op": "AND"|"OR", "children": [ RuleExpression, ... ] }

=== AUXILIARY EXITS (exits array, applied to both long and short) ===
{ "kind": "takeProfitPct", "pct": number }   long: close>=entry*(1+pct/100); short: close<=entry*(1-pct/100)
{ "kind": "stopLossPct", "pct": number }     long: close<=entry*(1-pct/100); short: close>=entry*(1+pct/100)
{ "kind": "takeProfitAbs", "delta": number }
{ "kind": "stopLossAbs", "delta": number }
{ "kind": "barsHeld", "bars": positive integer }
{ "kind": "timeHeld", "minutes": positive number }
{ "kind": "priceAbove", "value": number }
{ "kind": "priceBelow", "value": number }
{ "kind": "timeOfDay", "hhmm": "H:MM" or "HH:MM" }

=== OUTPUT ENVELOPE ===
The "interval" field in strategy is OPTIONAL — include it ONLY when the user explicitly names a timeframe (e.g. "on 15m", "1h chart", "daily candles"). Omit it if the user does not specify a timeframe. Valid values: "1m","5m","15m","30m","1h","2h","4h","12h","1d","1w".
{
  "version": 1,
  "strategy": {
    "initialBalance": number,
    "startBarIndex": 0,
    "endBarIndex": 9999999,
    "interval": "15m",              (OPTIONAL — omit when user does not specify a timeframe)
    "buyRule": RuleExpression,
    "sellRule": RuleExpression,
    "shortRule": RuleExpression,      (OPTIONAL — omit for long-only strategies)
    "shortSellRule": RuleExpression,  (OPTIONAL — omit when shortSellRule = sellRule)
    "exits": [ ExitCondition, ... ]
  },
  "meta": {
    "title": string,
    "assumptions": string[],
    "unsupportedRequests": string[]
  }
}

=== VWAP MEAN-REVERSION EXAMPLE (bidirectional) ===
Strategy: "enter long when close dips 0.3% below VWAP, enter short when close rises 0.3% above VWAP, exit when price reverts to VWAP, stop-loss 0.5%"
{
  "buyRule":      { "source": {"type":"price","field":"close"}, "op": "lt",  "rhs": {"kind":"indicatorPct","source":{"type":"catalog","catalogId":"vwap","figureKey":"value","params":{}},"pct":99.7} },
  "sellRule":     { "source": {"type":"price","field":"close"}, "op": "gte", "rhs": {"kind":"indicator",   "source":{"type":"catalog","catalogId":"vwap","figureKey":"value","params":{}}} },
  "shortRule":    { "source": {"type":"price","field":"close"}, "op": "gt",  "rhs": {"kind":"indicatorPct","source":{"type":"catalog","catalogId":"vwap","figureKey":"value","params":{}},"pct":100.3} },
  "shortSellRule":{ "source": {"type":"price","field":"close"}, "op": "lte", "rhs": {"kind":"indicator",   "source":{"type":"catalog","catalogId":"vwap","figureKey":"value","params":{}}} },
  "exits": [{"kind":"stopLossPct","pct":0.5}]
}

=== PLACEMENT RULES ===
- Indicator/price exits → sellRule / shortSellRule.
- Time / % / bars / clock exits → exits[] (order: TP before SL before bars).
- Use crossesAbove/crossesBelow only for true crosses; "below band" = "lt" on close vs band.

If the user asks for an indicator not in CATALOG_JSON, set "strategy" to null and explain in meta.unsupportedRequests. Never invent catalogId or figureKey.`
