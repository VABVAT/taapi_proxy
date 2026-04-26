import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const DEFAULT_TABLE_NAME = 'ai_compile_strategy_prompts'

/**
 * @param {{
 *   env?: NodeJS.ProcessEnv,
 *   createClient?: typeof createSupabaseClient,
 *   logError?: (message: string, extra?: unknown) => void,
 * }} [deps]
 */
export function makeAiCompilePromptLogger(deps = {}) {
  const env = deps.env || process.env
  const createClient = deps.createClient || createSupabaseClient
  const logError = deps.logError || ((message, extra) => console.error(message, extra))
  const supabaseUrl = String(env.SUPABASE_URL || '').trim()
  const supabaseKey = String(env.SUPABASE_PUBLISHABLE_KEY || env.SUPABASE_ANON_KEY || '').trim()
  const tableName = String(env.SUPABASE_AI_LOG_TABLE || DEFAULT_TABLE_NAME).trim()
  let client

  function getClient() {
    if (!supabaseUrl || !supabaseKey || !tableName) {
      return null
    }
    if (!client) {
      client = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    }
    return client
  }

  /**
   * Best-effort prompt logging. The caller should not fail just because logging failed.
   * @param {string} instruction
   */
  async function logAiCompilePrompt(instruction) {
    const trimmedInstruction = String(instruction || '').trim()
    if (!trimmedInstruction) {
      return
    }
    const supabase = getClient()
    if (!supabase) {
      return
    }

    try {
      const { error } = await supabase.from(tableName).insert({ instruction: trimmedInstruction })
      if (error) {
        logError('[supabase] ai compile prompt log failed', error)
      }
    } catch (error) {
      logError('[supabase] ai compile prompt log failed', error)
    }
  }

  return { logAiCompilePrompt }
}

export const aiCompilePromptLogger = makeAiCompilePromptLogger()
