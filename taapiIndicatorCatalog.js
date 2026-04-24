import { periodParam } from './taapiIndicatorParams.js'

/**
 * @typedef {{
 *   id: string
 *   label: string
 *   apiPath: string
 *   placement: 'main' | 'pane'
 *   paneHeight?: number
 *   precision?: number
 *   figures: Array<{ key: string, title: string, taapiFields: string[], type?: 'line' | 'bar' }>
 *   valueMode?: 'flat' | 'donchian'
 *   staticQuery?: Record<string, string>
 *   fetchQuery?: Record<string, string>
 *   params?: import('./taapiIndicatorParams.js').CatalogParamDef[]
 * }} TaapiCatalogEntry
 */

const P = periodParam

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const MACD_PARAMS = [
  { key: 'fast', label: 'Fast', taapiKey: 'optInFastPeriod', type: 'int', default: 12, min: 1, max: 200, step: 1 },
  { key: 'slow', label: 'Slow', taapiKey: 'optInSlowPeriod', type: 'int', default: 26, min: 1, max: 200, step: 1 },
  { key: 'signal', label: 'Signal', taapiKey: 'optInSignalPeriod', type: 'int', default: 9, min: 1, max: 200, step: 1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const BB_PARAMS = [
  P(20),
  { key: 'stddev', label: 'Std dev', taapiKey: 'stddev', type: 'float', default: 2, min: 0.1, max: 10, step: 0.1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const STOCH_PARAMS = [
  { key: 'kPeriod', label: '%K period', taapiKey: 'kPeriod', type: 'int', default: 5, min: 1, max: 100, step: 1 },
  { key: 'dPeriod', label: '%D period', taapiKey: 'dPeriod', type: 'int', default: 3, min: 1, max: 100, step: 1 },
  { key: 'kSmooth', label: 'K smooth', taapiKey: 'kSmooth', type: 'int', default: 3, min: 1, max: 100, step: 1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const STOCHRSI_PARAMS = [
  { key: 'rsiPeriod', label: 'RSI period', taapiKey: 'rsiPeriod', type: 'int', default: 14, min: 2, max: 100, step: 1 },
  { key: 'stochasticPeriod', label: 'Stoch period', taapiKey: 'stochasticPeriod', type: 'int', default: 14, min: 2, max: 100, step: 1 },
  { key: 'kPeriod', label: '%K period', taapiKey: 'kPeriod', type: 'int', default: 5, min: 1, max: 100, step: 1 },
  { key: 'dPeriod', label: '%D period', taapiKey: 'dPeriod', type: 'int', default: 3, min: 1, max: 100, step: 1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const SUPERTREND_PARAMS = [
  { key: 'period', label: 'ATR period', taapiKey: 'period', type: 'int', default: 7, min: 1, max: 100, step: 1 },
  { key: 'multiplier', label: 'Multiplier', taapiKey: 'multiplier', type: 'float', default: 3, min: 0.1, max: 20, step: 0.1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const PSAR_PARAMS = [
  { key: 'start', label: 'Start', taapiKey: 'start', type: 'float', default: 0.02, min: 0.001, max: 1, step: 0.01 },
  { key: 'increment', label: 'Increment', taapiKey: 'increment', type: 'float', default: 0.02, min: 0.001, max: 1, step: 0.01 },
  { key: 'maximum', label: 'Maximum', taapiKey: 'maximum', type: 'float', default: 0.2, min: 0.01, max: 1, step: 0.01 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const ICHIMOKU_PARAMS = [
  { key: 'conversionPeriod', label: 'Conversion', taapiKey: 'conversionPeriod', type: 'int', default: 9, min: 1, max: 200, step: 1 },
  { key: 'basePeriod', label: 'Base', taapiKey: 'basePeriod', type: 'int', default: 26, min: 1, max: 200, step: 1 },
  { key: 'spanPeriod', label: 'Span', taapiKey: 'spanPeriod', type: 'int', default: 52, min: 1, max: 200, step: 1 },
  { key: 'displacement', label: 'Displacement', taapiKey: 'displacement', type: 'int', default: 26, min: 1, max: 200, step: 1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const KELTNER_PARAMS = [
  P(20),
  { key: 'multiplier', label: 'Multiplier', taapiKey: 'multiplier', type: 'int', default: 2, min: 1, max: 10, step: 1 },
  { key: 'atrLength', label: 'ATR length', taapiKey: 'atrLength', type: 'int', default: 10, min: 1, max: 100, step: 1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const KVO_PARAMS = [
  { key: 'short_period', label: 'Short period', taapiKey: 'short_period', type: 'float', default: 9, min: 1, max: 100, step: 1 },
  { key: 'long_period', label: 'Long period', taapiKey: 'long_period', type: 'float', default: 30, min: 1, max: 200, step: 1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const VOSC_PARAMS = [
  { key: 'short_period', label: 'Short period', taapiKey: 'short_period', type: 'int', default: 5, min: 1, max: 100, step: 1 },
  { key: 'long_period', label: 'Long period', taapiKey: 'long_period', type: 'int', default: 10, min: 1, max: 200, step: 1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const ULTOSC_PARAMS = [
  { key: 't1', label: 'Period 1', taapiKey: 'optInTimePeriod1', type: 'int', default: 7, min: 1, max: 100, step: 1 },
  { key: 't2', label: 'Period 2', taapiKey: 'optInTimePeriod2', type: 'int', default: 14, min: 1, max: 100, step: 1 },
  { key: 't3', label: 'Period 3', taapiKey: 'optInTimePeriod3', type: 'int', default: 28, min: 1, max: 100, step: 1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const PPO_PARAMS = [
  { key: 'fast', label: 'Fast', taapiKey: 'optInFastPeriod', type: 'int', default: 12, min: 1, max: 200, step: 1 },
  { key: 'slow', label: 'Slow', taapiKey: 'optInSlowPeriod', type: 'int', default: 26, min: 1, max: 200, step: 1 },
]

/** Same as `period` in the UI, mapped to TAAPI `optInTimePeriod` (Wilder / Hilbert / some math endpoints). */
const OT = (d = 14, min = 2, max = 200) => ({
  key: 'period',
  label: 'Period',
  taapiKey: 'optInTimePeriod',
  type: 'int',
  default: d,
  min,
  max,
  step: 1,
})

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const ACCOSC_PARAMS = [
  { key: 'lengthFast', label: 'Fast', taapiKey: 'lengthFast', type: 'int', default: 5, min: 1, max: 200, step: 1 },
  { key: 'lengthSlow', label: 'Slow', taapiKey: 'lengthSlow', type: 'int', default: 34, min: 1, max: 200, step: 1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const KDJ_PARAMS = [
  P(14),
  { key: 'signal', label: 'Signal', taapiKey: 'signal', type: 'int', default: 3, min: 1, max: 100, step: 1 },
]

/** @type {import('./taapiIndicatorParams.js').CatalogParamDef[]} */
const WILLIAMS_ALLIGATOR_PARAMS = [
  { key: 'jawsLength', label: 'Jaws len', taapiKey: 'jawsLength', type: 'int', default: 13, min: 1, max: 200, step: 1 },
  { key: 'teethLength', label: 'Teeth len', taapiKey: 'teethLength', type: 'int', default: 8, min: 1, max: 200, step: 1 },
  { key: 'lipsLength', label: 'Lips len', taapiKey: 'lipsLength', type: 'int', default: 5, min: 1, max: 200, step: 1 },
  { key: 'jawsOffset', label: 'Jaws off', taapiKey: 'jawsOffset', type: 'int', default: 8, min: 0, max: 200, step: 1 },
  { key: 'teethOffset', label: 'Teeth off', taapiKey: 'teethOffset', type: 'int', default: 5, min: 0, max: 200, step: 1 },
  { key: 'lipsOffset', label: 'Lips off', taapiKey: 'lipsOffset', type: 'int', default: 3, min: 0, max: 200, step: 1 },
]

/** MACD with controllable MA types: default all segments to EMA (`1`) per TAAPI. */
const MACDEXT_STATIC = {
  optInFastMAType: '1',
  optInSlowMAType: '1',
  optInSignalMAType: '1',
}

/** @type {TaapiCatalogEntry[]} */
export const FAMOUS_TAAPI_INDICATORS = [
  { id: 'rsi', label: 'RSI', apiPath: 'rsi', placement: 'pane', paneHeight: 120, params: [P(14)], figures: [{ key: 'v', title: 'RSI: ', taapiFields: ['value'] }] },
  { id: 'macd', label: 'MACD', apiPath: 'macd', placement: 'pane', paneHeight: 128, params: MACD_PARAMS, figures: [
    { key: 'macd', title: 'MACD: ', taapiFields: ['valueMACD'] },
    { key: 'signal', title: 'Sig: ', taapiFields: ['valueMACDSignal'] },
    { key: 'hist', title: 'Hist: ', taapiFields: ['valueMACDHist'] },
  ] },
  { id: 'stoch', label: 'Stochastic', apiPath: 'stoch', placement: 'pane', paneHeight: 110, params: STOCH_PARAMS, figures: [
    { key: 'k', title: '%K: ', taapiFields: ['valueK'] },
    { key: 'd', title: '%D: ', taapiFields: ['valueD'] },
  ] },
  { id: 'stochrsi', label: 'StochRSI', apiPath: 'stochrsi', placement: 'pane', paneHeight: 110, params: STOCHRSI_PARAMS, figures: [
    { key: 'fk', title: 'K: ', taapiFields: ['valueFastK'] },
    { key: 'fd', title: 'D: ', taapiFields: ['valueFastD'] },
  ] },
  { id: 'cci', label: 'CCI', apiPath: 'cci', placement: 'pane', paneHeight: 100, params: [P(20)], figures: [{ key: 'v', title: 'CCI: ', taapiFields: ['value'] }] },
  { id: 'mfi', label: 'Money Flow Index', apiPath: 'mfi', placement: 'pane', paneHeight: 100, params: [P(14)], figures: [{ key: 'v', title: 'MFI: ', taapiFields: ['value'] }] },
  { id: 'obv', label: 'On Balance Volume', apiPath: 'obv', placement: 'pane', paneHeight: 100, params: [], figures: [{ key: 'v', title: 'OBV: ', taapiFields: ['value'] }] },
  { id: 'cmf', label: 'Chaikin Money Flow', apiPath: 'cmf', placement: 'pane', paneHeight: 100, params: [P(20)], figures: [{ key: 'v', title: 'CMF: ', taapiFields: ['value'] }] },
  { id: 'ad', label: 'Chaikin A/D', apiPath: 'ad', placement: 'pane', paneHeight: 100, params: [], figures: [{ key: 'v', title: 'A/D: ', taapiFields: ['value'] }] },
  { id: 'adosc', label: 'Chaikin A/D Oscillator', apiPath: 'adosc', placement: 'pane', paneHeight: 100, params: [P(14)], figures: [{ key: 'v', title: 'ADOSC: ', taapiFields: ['value'] }] },
  { id: 'ao', label: 'Awesome Oscillator', apiPath: 'ao', placement: 'pane', paneHeight: 100, params: [
    { key: 'fast', label: 'Fast', taapiKey: 'fast', type: 'int', default: 5, min: 1, max: 100, step: 1 },
    { key: 'slow', label: 'Slow', taapiKey: 'slow', type: 'int', default: 34, min: 1, max: 200, step: 1 },
  ], figures: [{ key: 'v', title: 'AO: ', taapiFields: ['value'] }] },
  { id: 'roc', label: 'Rate of Change', apiPath: 'roc', placement: 'pane', paneHeight: 96, params: [P(10)], figures: [{ key: 'v', title: 'ROC: ', taapiFields: ['value'] }] },
  { id: 'mom', label: 'Momentum', apiPath: 'mom', placement: 'pane', paneHeight: 96, params: [P(10)], figures: [{ key: 'v', title: 'MOM: ', taapiFields: ['value'] }] },
  { id: 'willr', label: 'Williams %R', apiPath: 'willr', placement: 'pane', paneHeight: 100, params: [P(14)], figures: [{ key: 'v', title: '%R: ', taapiFields: ['value'] }] },
  { id: 'cmo', label: 'Chande Momentum', apiPath: 'cmo', placement: 'pane', paneHeight: 96, params: [P(14)], figures: [{ key: 'v', title: 'CMO: ', taapiFields: ['value'] }] },
  { id: 'ppo', label: 'PPO', apiPath: 'ppo', placement: 'pane', paneHeight: 96, params: PPO_PARAMS, figures: [{ key: 'v', title: 'PPO: ', taapiFields: ['value'] }] },
  { id: 'trix', label: 'TRIX', apiPath: 'trix', placement: 'pane', paneHeight: 96, params: [P(30)], figures: [{ key: 'v', title: 'TRIX: ', taapiFields: ['value'] }] },
  { id: 'ultosc', label: 'Ultimate Oscillator', apiPath: 'ultosc', placement: 'pane', paneHeight: 100, params: ULTOSC_PARAMS, figures: [{ key: 'v', title: 'ULT: ', taapiFields: ['value'] }] },
  { id: 'dpo', label: 'Detrended Price Oscillator', apiPath: 'dpo', placement: 'pane', paneHeight: 96, params: [P(20)], figures: [{ key: 'v', title: 'DPO: ', taapiFields: ['value'] }] },
  { id: 'fisher', label: 'Fisher Transform', apiPath: 'fisher', placement: 'pane', paneHeight: 100, params: [P(14)], figures: [
    { key: 'f', title: 'Fisher: ', taapiFields: ['fisher'] },
    { key: 'sig', title: 'Sig: ', taapiFields: ['fisher_signal'] },
  ] },
  { id: 'atr', label: 'ATR', apiPath: 'atr', placement: 'pane', paneHeight: 96, params: [P(14)], figures: [{ key: 'v', title: 'ATR: ', taapiFields: ['value'] }] },
  { id: 'natr', label: 'NATR', apiPath: 'natr', placement: 'pane', paneHeight: 96, params: [P(14)], figures: [{ key: 'v', title: 'NATR: ', taapiFields: ['value'] }] },
  { id: 'bbw', label: 'Bollinger Band Width', apiPath: 'bbw', placement: 'pane', paneHeight: 96, params: BB_PARAMS, figures: [{ key: 'v', title: 'BBW: ', taapiFields: ['value'] }] },
  { id: 'stddev', label: 'Standard Deviation', apiPath: 'stddev', placement: 'pane', paneHeight: 96, params: [P(20)], figures: [{ key: 'v', title: 'StdDev: ', taapiFields: ['value'] }] },
  { id: 'adx', label: 'ADX', apiPath: 'adx', placement: 'pane', paneHeight: 100, params: [P(14)], figures: [{ key: 'v', title: 'ADX: ', taapiFields: ['value'] }] },
  { id: 'dmi', label: 'DMI (+DI / -DI / ADX)', apiPath: 'dmi', placement: 'pane', paneHeight: 110, params: [P(14)], figures: [
    { key: 'adx', title: 'ADX: ', taapiFields: ['adx'] },
    { key: 'pdi', title: '+DI: ', taapiFields: ['pdi'] },
    { key: 'mdi', title: '-DI: ', taapiFields: ['mdi'] },
  ] },
  { id: 'vortex', label: 'Vortex', apiPath: 'vortex', placement: 'pane', paneHeight: 100, params: [P(14)], figures: [
    { key: 'plus', title: '+VI: ', taapiFields: ['plus'] },
    { key: 'minus', title: '-VI: ', taapiFields: ['minus'] },
  ] },
  { id: 'mass', label: 'Mass Index', apiPath: 'mass', placement: 'pane', paneHeight: 96, params: [P(25)], figures: [{ key: 'v', title: 'Mass: ', taapiFields: ['value'] }] },
  { id: 'kvo', label: 'Klinger Volume Oscillator', apiPath: 'kvo', placement: 'pane', paneHeight: 100, params: KVO_PARAMS, figures: [{ key: 'v', title: 'KVO: ', taapiFields: ['value'] }] },
  { id: 'vosc', label: 'Volume Oscillator', apiPath: 'vosc', placement: 'pane', paneHeight: 96, params: VOSC_PARAMS, figures: [{ key: 'v', title: 'VOSC: ', taapiFields: ['value'] }] },
  { id: 'aroon', label: 'Aroon', apiPath: 'aroon', placement: 'pane', paneHeight: 100, params: [P(25)], figures: [
    { key: 'down', title: 'Down: ', taapiFields: ['valueAroonDown'] },
    { key: 'up', title: 'Up: ', taapiFields: ['valueAroonUp'] },
  ] },
  { id: 'aroonosc', label: 'Aroon Oscillator', apiPath: 'aroonosc', placement: 'pane', paneHeight: 96, params: [P(25)], figures: [{ key: 'v', title: 'AroonOsc: ', taapiFields: ['value'] }] },
  { id: 'apo', label: 'Absolute Price Oscillator', apiPath: 'apo', placement: 'pane', paneHeight: 96, params: PPO_PARAMS, figures: [{ key: 'v', title: 'APO: ', taapiFields: ['value'] }] },
  { id: 'bop', label: 'Balance of Power', apiPath: 'bop', placement: 'pane', paneHeight: 96, params: [], figures: [{ key: 'v', title: 'BOP: ', taapiFields: ['value'] }] },
  { id: 'chop', label: 'Choppiness Index', apiPath: 'chop', placement: 'pane', paneHeight: 96, params: [P(14)], figures: [{ key: 'v', title: 'CHOP: ', taapiFields: ['value'] }] },
  { id: 'coppockcurve', label: 'Coppock Curve', apiPath: 'coppockcurve', placement: 'pane', paneHeight: 96, params: [P(14)], figures: [{ key: 'v', title: 'Coppock: ', taapiFields: ['value'] }] },
  { id: 'eom', label: 'Ease of Movement', apiPath: 'eom', placement: 'pane', paneHeight: 96, params: [P(14)], figures: [{ key: 'v', title: 'EOM: ', taapiFields: ['value'] }] },
  { id: 'stochf', label: 'Stochastic Fast', apiPath: 'stochf', placement: 'pane', paneHeight: 110, params: [
    { key: 'fastK', label: 'Fast K', taapiKey: 'fastK', type: 'int', default: 5, min: 1, max: 100, step: 1 },
    { key: 'fastD', label: 'Fast D', taapiKey: 'fastD', type: 'int', default: 3, min: 1, max: 100, step: 1 },
  ], figures: [
    { key: 'fastK', title: 'FK: ', taapiFields: ['valueFastK'] },
    { key: 'fastD', title: 'FD: ', taapiFields: ['valueFastD'] },
  ] },
  { id: 'stc', label: 'Schaff Trend Cycle', apiPath: 'stc', placement: 'pane', paneHeight: 100, params: [P(10)], figures: [{ key: 'v', title: 'STC: ', taapiFields: ['value'] }] },
  { id: 'rvgi', label: 'Relative Vigor Index', apiPath: 'rvgi', placement: 'pane', paneHeight: 100, params: [P(10)], figures: [{ key: 'v', title: 'RVGI: ', taapiFields: ['value'] }] },
  { id: 'rocp', label: 'ROCP', apiPath: 'rocp', placement: 'pane', paneHeight: 96, params: [P(10)], figures: [{ key: 'v', title: 'ROCP: ', taapiFields: ['value'] }] },
  { id: 'rocr', label: 'ROCR', apiPath: 'rocr', placement: 'pane', paneHeight: 96, params: [P(10)], figures: [{ key: 'v', title: 'ROCR: ', taapiFields: ['value'] }] },
  { id: 'squeeze', label: 'Squeeze Momentum', apiPath: 'squeeze', placement: 'pane', paneHeight: 100, params: [P(20)], figures: [{ key: 'v', title: 'Squeeze: ', taapiFields: ['value'] }] },
  { id: 'linearreg', label: 'Linear Regression', apiPath: 'linearreg', placement: 'pane', paneHeight: 96, params: [P(14)], figures: [{ key: 'v', title: 'LinReg: ', taapiFields: ['value'] }] },
  { id: 'mama', label: 'MESA Adaptive MA', apiPath: 'mama', placement: 'main', params: [P(14)], figures: [{ key: 'v', title: 'MAMA: ', taapiFields: ['value'] }] },
  { id: 'nvi', label: 'Negative Volume Index', apiPath: 'nvi', placement: 'pane', paneHeight: 100, params: [P(14)], figures: [{ key: 'v', title: 'NVI: ', taapiFields: ['value'] }] },
  { id: 'pvi', label: 'Positive Volume Index', apiPath: 'pvi', placement: 'pane', paneHeight: 100, params: [P(14)], figures: [{ key: 'v', title: 'PVI: ', taapiFields: ['value'] }] },
  { id: 'typprice', label: 'Typical Price', apiPath: 'typprice', placement: 'main', params: [], figures: [{ key: 'v', title: 'Typ: ', taapiFields: ['value'] }] },
  { id: 'volatility', label: 'Annualized Volatility', apiPath: 'volatility', placement: 'pane', paneHeight: 96, params: [P(20)], figures: [{ key: 'v', title: 'Vol: ', taapiFields: ['value'] }] },
  { id: 'accbands', label: 'Acceleration Bands', apiPath: 'accbands', placement: 'main', params: [P(20)], figures: [
    { key: 'upper', title: 'UP: ', taapiFields: ['valueUpperBand'] },
    { key: 'mid', title: 'MID: ', taapiFields: ['valueMiddleBand'] },
    { key: 'lower', title: 'LO: ', taapiFields: ['valueLowerBand'] },
  ] },
  { id: 'ema', label: 'EMA', apiPath: 'ema', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'EMA: ', taapiFields: ['value'] }] },
  { id: 'sma', label: 'SMA', apiPath: 'sma', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'SMA: ', taapiFields: ['value'] }] },
  { id: 'wma', label: 'WMA', apiPath: 'wma', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'WMA: ', taapiFields: ['value'] }] },
  { id: 'hma', label: 'Hull MA', apiPath: 'hma', placement: 'main', params: [P(20)], figures: [{ key: 'v', title: 'HMA: ', taapiFields: ['value'] }] },
  { id: 'vwma', label: 'Volume Weighted MA', apiPath: 'vwma', placement: 'main', params: [P(20)], figures: [{ key: 'v', title: 'VWMA: ', taapiFields: ['value'] }] },
  { id: 'dema', label: 'DEMA', apiPath: 'dema', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'DEMA: ', taapiFields: ['value'] }] },
  { id: 'tema', label: 'TEMA', apiPath: 'tema', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'TEMA: ', taapiFields: ['value'] }] },
  { id: 'kama', label: 'Kaufman AMA', apiPath: 'kama', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'KAMA: ', taapiFields: ['value'] }] },
  { id: 'vidya', label: 'VIDYA', apiPath: 'vidya', placement: 'main', params: [P(14)], figures: [{ key: 'v', title: 'VIDYA: ', taapiFields: ['value'] }] },
  { id: 't3', label: 'T3', apiPath: 't3', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'T3: ', taapiFields: ['value'] }] },
  { id: 'trima', label: 'TRIMA', apiPath: 'trima', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'TRIMA: ', taapiFields: ['value'] }] },
  { id: 'ma', label: 'Moving Average', apiPath: 'ma', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'MA: ', taapiFields: ['value'] }] },
  { id: 'zlema', label: 'Zero-Lag EMA', apiPath: 'zlema', placement: 'main', params: [P(20)], figures: [{ key: 'v', title: 'ZLEMA: ', taapiFields: ['value'] }] },
  { id: 'wilders', label: 'Wilders Smoothing', apiPath: 'wilders', placement: 'main', params: [P(14)], figures: [{ key: 'v', title: 'Wilders: ', taapiFields: ['value'] }] },
  { id: 'bbands', label: 'Bollinger Bands', apiPath: 'bbands', placement: 'main', params: BB_PARAMS, figures: [
    { key: 'upper', title: 'UP: ', taapiFields: ['valueUpperBand'] },
    { key: 'mid', title: 'MID: ', taapiFields: ['valueMiddleBand'] },
    { key: 'lower', title: 'LO: ', taapiFields: ['valueLowerBand'] },
  ] },
  { id: 'keltnerchannels', label: 'Keltner Channels', apiPath: 'keltnerchannels', placement: 'main', params: KELTNER_PARAMS, figures: [
    { key: 'upper', title: 'KC↑: ', taapiFields: ['upper'] },
    { key: 'mid', title: 'KC—: ', taapiFields: ['middle'] },
    { key: 'lower', title: 'KC↓: ', taapiFields: ['lower'] },
  ] },
  { id: 'ichimoku', label: 'Ichimoku', apiPath: 'ichimoku', placement: 'main', params: ICHIMOKU_PARAMS, figures: [
    { key: 'conv', title: 'Tenkan: ', taapiFields: ['conversion'] },
    { key: 'base', title: 'Kijun: ', taapiFields: ['base'] },
    { key: 'spanA', title: 'Span A: ', taapiFields: ['spanA'] },
    { key: 'spanB', title: 'Span B: ', taapiFields: ['spanB'] },
  ] },
  { id: 'psar', label: 'Parabolic SAR', apiPath: 'psar', placement: 'main', params: PSAR_PARAMS, figures: [{ key: 'v', title: 'PSAR: ', taapiFields: ['value'] }] },
  { id: 'supertrend', label: 'Supertrend', apiPath: 'supertrend', placement: 'main', params: SUPERTREND_PARAMS, figures: [{ key: 'v', title: 'ST: ', taapiFields: ['value'] }] },
  { id: 'vwap', label: 'VWAP', apiPath: 'vwap', placement: 'main', params: [], figures: [{ key: 'v', title: 'VWAP: ', taapiFields: ['value'] }] },
  { id: 'midpoint', label: 'Midpoint', apiPath: 'midpoint', placement: 'main', params: [P(14)], figures: [{ key: 'v', title: 'Mid: ', taapiFields: ['value'] }] },
  { id: 'medprice', label: 'Median Price', apiPath: 'medprice', placement: 'main', params: [], figures: [{ key: 'v', title: 'Med: ', taapiFields: ['value'] }] },
  { id: 'donchianchannels', label: 'Donchian Channels', apiPath: 'donchianchannels', placement: 'main', valueMode: 'donchian', params: [P(20)], figures: [
    { key: 'upper', title: 'DC↑: ', taapiFields: ['upper'] },
    { key: 'mid', title: 'DC—: ', taapiFields: ['middle'] },
    { key: 'lower', title: 'DC↓: ', taapiFields: ['lower'] },
  ] },

  { id: 'adxr', label: 'ADXR', apiPath: 'adxr', placement: 'pane', paneHeight: 100, params: [P(14)], figures: [{ key: 'v', title: 'ADXR: ', taapiFields: ['value'] }] },
  { id: 'avgprice', label: 'Average Price', apiPath: 'avgprice', placement: 'main', params: [], figures: [{ key: 'v', title: 'Avg: ', taapiFields: ['value'] }] },
  { id: 'accosc', label: 'Accelerator Oscillator', apiPath: 'accosc', placement: 'pane', paneHeight: 100, params: ACCOSC_PARAMS, figures: [{ key: 'v', title: 'AC: ', taapiFields: ['value'] }] },
  { id: 'smma', label: 'SMMA', apiPath: 'smma', placement: 'main', params: [P(7)], figures: [{ key: 'v', title: 'SMMA: ', taapiFields: ['value'] }] },
  { id: 'midprice', label: 'Midpoint Price', apiPath: 'midprice', placement: 'main', params: [OT(14)], figures: [{ key: 'v', title: 'Mid: ', taapiFields: ['value'] }] },
  { id: 'wclprice', label: 'Weighted Close', apiPath: 'wclprice', placement: 'main', params: [], figures: [{ key: 'v', title: 'WCL: ', taapiFields: ['value'] }] },
  { id: 'tr', label: 'True Range', apiPath: 'tr', placement: 'pane', paneHeight: 96, params: [], figures: [{ key: 'v', title: 'TR: ', taapiFields: ['value'] }] },
  { id: 'dx', label: 'DX', apiPath: 'dx', placement: 'pane', paneHeight: 96, params: [P(14)], figures: [{ key: 'v', title: 'DX: ', taapiFields: ['value'] }] },
  { id: 'plus_di', label: '+DI', apiPath: 'plus_di', placement: 'pane', paneHeight: 96, params: [OT(14)], figures: [{ key: 'v', title: '+DI: ', taapiFields: ['value'] }] },
  { id: 'minus_di', label: '-DI', apiPath: 'minus_di', placement: 'pane', paneHeight: 96, params: [OT(14)], figures: [{ key: 'v', title: '-DI: ', taapiFields: ['value'] }] },
  { id: 'plus_dm', label: '+DM', apiPath: 'plus_dm', placement: 'pane', paneHeight: 96, params: [OT(14)], figures: [{ key: 'v', title: '+DM: ', taapiFields: ['value'] }] },
  { id: 'minus_dm', label: '-DM', apiPath: 'minus_dm', placement: 'pane', paneHeight: 96, params: [OT(14)], figures: [{ key: 'v', title: '-DM: ', taapiFields: ['value'] }] },
  { id: 'dm', label: 'Directional Movement', apiPath: 'dm', placement: 'pane', paneHeight: 100, params: [P(14)], figures: [
    { key: 'plus', title: '+DM: ', taapiFields: ['plus_dm'] },
    { key: 'minus', title: '-DM: ', taapiFields: ['minus_dm'] },
  ] },
  { id: 'macdext', label: 'MACD (ext)', apiPath: 'macdext', placement: 'pane', paneHeight: 128, params: MACD_PARAMS, staticQuery: MACDEXT_STATIC, figures: [
    { key: 'macd', title: 'MACD: ', taapiFields: ['valueMACD'] },
    { key: 'signal', title: 'Sig: ', taapiFields: ['valueMACDSignal'] },
    { key: 'hist', title: 'Hist: ', taapiFields: ['valueMACDHist'] },
  ] },
  { id: 'kdj', label: 'KDJ', apiPath: 'kdj', placement: 'pane', paneHeight: 110, params: KDJ_PARAMS, figures: [
    { key: 'k', title: 'K: ', taapiFields: ['valueK'] },
    { key: 'd', title: 'D: ', taapiFields: ['valueD'] },
    { key: 'j', title: 'J: ', taapiFields: ['valueJ'] },
  ] },
  { id: 'williamsalligator', label: 'Williams Alligator', apiPath: 'williamsalligator', placement: 'main', params: WILLIAMS_ALLIGATOR_PARAMS, figures: [
    { key: 'jaws', title: 'Jaw: ', taapiFields: ['valueJaws'] },
    { key: 'teeth', title: 'Teeth: ', taapiFields: ['valueTeeth'] },
    { key: 'lips', title: 'Lips: ', taapiFields: ['valueLips'] },
  ] },
  { id: 'ht_trendline', label: 'HT Trendline', apiPath: 'ht_trendline', placement: 'main', params: [], figures: [{ key: 'v', title: 'HT-TL: ', taapiFields: ['value'] }] },
  { id: 'ht_dcperiod', label: 'HT Dominant Cycle Period', apiPath: 'ht_dcperiod', placement: 'pane', paneHeight: 96, params: [], figures: [{ key: 'v', title: 'DC: ', taapiFields: ['value'] }] },
  { id: 'ht_dcphase', label: 'HT Dominant Cycle Phase', apiPath: 'ht_dcphase', placement: 'pane', paneHeight: 96, params: [], figures: [{ key: 'v', title: 'Phase: ', taapiFields: ['value'] }] },
  { id: 'ht_phasor', label: 'HT Phasor', apiPath: 'ht_phasor', placement: 'pane', paneHeight: 100, params: [], figures: [
    { key: 'in', title: 'In: ', taapiFields: ['valueInPhase'] },
    { key: 'quad', title: 'Quad: ', taapiFields: ['valueQuadrature'] },
  ] },
  { id: 'ht_sine', label: 'HT SineWave', apiPath: 'ht_sine', placement: 'pane', paneHeight: 100, params: [], figures: [
    { key: 'sine', title: 'Sin: ', taapiFields: ['valueSine'] },
    { key: 'lead', title: 'Lead: ', taapiFields: ['valueLeadSine'] },
  ] },
  { id: 'msw', label: 'Mesa Sine Wave', apiPath: 'msw', placement: 'pane', paneHeight: 100, params: [P(50)], figures: [
    { key: 'sine', title: 'Sine: ', taapiFields: ['msw_sine'] },
    { key: 'lead', title: 'Lead: ', taapiFields: ['msw_lead'] },
  ] },
  { id: 'qstick', label: 'Qstick', apiPath: 'qstick', placement: 'pane', paneHeight: 96, params: [P(14)], figures: [{ key: 'v', title: 'Qstick: ', taapiFields: ['value'] }] },
  { id: 'rocr100', label: 'ROCR100', apiPath: 'rocr100', placement: 'pane', paneHeight: 96, params: [OT(10)], figures: [{ key: 'v', title: 'ROCR100: ', taapiFields: ['value'] }] },
  { id: 'tsf', label: 'Time Series Forecast', apiPath: 'tsf', placement: 'main', params: [OT(14)], figures: [{ key: 'v', title: 'TSF: ', taapiFields: ['value'] }] },
  { id: 'var', label: 'Variance', apiPath: 'var', placement: 'pane', paneHeight: 96, params: [OT(5)], figures: [{ key: 'v', title: 'Var: ', taapiFields: ['value'] }] },
  { id: 'marketfi', label: 'Market Facilitation Index', apiPath: 'marketfi', placement: 'pane', paneHeight: 96, params: [], figures: [{ key: 'v', title: 'MkFI: ', taapiFields: ['value'] }] },
  { id: 'fosc', label: 'Forecast Oscillator', apiPath: 'fosc', placement: 'pane', paneHeight: 96, params: [P(14)], figures: [{ key: 'v', title: 'FOSC: ', taapiFields: ['value'] }] },
  { id: 'vhf', label: 'Vertical Horizontal Filter', apiPath: 'vhf', placement: 'pane', paneHeight: 96, params: [P(14)], figures: [{ key: 'v', title: 'VHF: ', taapiFields: ['value'] }] },
  { id: 'wad', label: 'Williams A/D', apiPath: 'wad', placement: 'pane', paneHeight: 100, params: [], figures: [{ key: 'v', title: 'WAD: ', taapiFields: ['value'] }] },
  { id: 'sum', label: 'Summation', apiPath: 'sum', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'Sum: ', taapiFields: ['value'] }] },
  { id: 'linearreg_angle', label: 'Linear Reg Angle', apiPath: 'linearreg_angle', placement: 'pane', paneHeight: 96, params: [OT(14)], figures: [{ key: 'v', title: 'LRA: ', taapiFields: ['value'] }] },
  { id: 'linearreg_slope', label: 'Linear Reg Slope', apiPath: 'linearreg_slope', placement: 'pane', paneHeight: 96, params: [OT(14)], figures: [{ key: 'v', title: 'LRS: ', taapiFields: ['value'] }] },
  { id: 'linearreg_intercept', label: 'Linear Reg Intercept', apiPath: 'linearreg_intercept', placement: 'main', params: [OT(14)], figures: [{ key: 'v', title: 'LRI: ', taapiFields: ['value'] }] },
  { id: 'ht_trendmode', label: 'HT Trend vs Cycle Mode', apiPath: 'ht_trendmode', placement: 'pane', paneHeight: 96, precision: 0, params: [], figures: [{ key: 'v', title: 'Mode: ', taapiFields: ['value'] }] },
  { id: 'pd', label: 'Price Direction', apiPath: 'pd', placement: 'pane', paneHeight: 96, params: [P(5)], figures: [{ key: 'v', title: 'PD: ', taapiFields: ['value'] }] },
  { id: 'max', label: 'Highest (max)', apiPath: 'max', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'Max: ', taapiFields: ['value'] }] },
  { id: 'min', label: 'Lowest (min)', apiPath: 'min', placement: 'main', params: [P(30)], figures: [{ key: 'v', title: 'Min: ', taapiFields: ['value'] }] },
  { id: 'abs', label: 'Vector Abs', apiPath: 'abs', placement: 'main', params: [], figures: [{ key: 'v', title: 'Abs: ', taapiFields: ['value'] }] },
  { id: 'beta', label: 'Beta', apiPath: 'beta', placement: 'pane', paneHeight: 96, params: [OT(5)], figures: [{ key: 'v', title: 'Beta: ', taapiFields: ['value'] }] },
]

const byId = new Map(FAMOUS_TAAPI_INDICATORS.map((e) => [e.id, e]))

/** @param {string} id */
export function getTaapiCatalogEntry(id) {
  return byId.get(id) ?? null
}

/** @param {string} q */
export function searchTaapiCatalog(q) {
  const s = String(q || '')
    .trim()
    .toLowerCase()
  if (!s) {
    return FAMOUS_TAAPI_INDICATORS.slice()
  }
  return FAMOUS_TAAPI_INDICATORS.filter(
    (e) => e.label.toLowerCase().includes(s) || e.id.includes(s) || e.apiPath.includes(s),
  )
}
