import assert from 'node:assert/strict'
import test from 'node:test'

import { makeAiCompilePromptLogger } from './supabasePromptLogger.js'

test('logs ai compile prompt to configured Supabase table', async () => {
  const inserts = []
  const logger = makeAiCompilePromptLogger({
    env: {
      SUPABASE_URL: 'https://example.supabase.co',
      SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test',
      SUPABASE_AI_LOG_TABLE: 'custom_prompt_logs',
    },
    createClient: () => ({
      from(tableName) {
        return {
          insert(payload) {
            inserts.push({ tableName, payload })
            return Promise.resolve({ error: null })
          },
        }
      },
    }),
    logError: () => {},
  })

  await logger.logAiCompilePrompt('buy when rsi is below 30')

  assert.deepEqual(inserts, [
    {
      tableName: 'custom_prompt_logs',
      payload: { instruction: 'buy when rsi is below 30' },
    },
  ])
})

test('skips logging when Supabase env is missing', async () => {
  let createClientCalled = false
  const logger = makeAiCompilePromptLogger({
    env: {},
    createClient: () => {
      createClientCalled = true
      throw new Error('should not create client')
    },
    logError: () => {},
  })

  await logger.logAiCompilePrompt('buy when rsi is below 30')

  assert.equal(createClientCalled, false)
})
