'use server'

import logger from '@/lib/logger'
import { supabaseUser } from './supabase/supabaseUser'
import TtsService from '../services/ttsService'

export default async function add(text: string): Promise<string> {
  logger.info('ADD ENDPOINT CALLED')

  const ttsClient = new TtsService()

  // const pollyService = new PollyService()
  const user = await supabaseUser()

  if (!user) {
    logger.error('Unable to add, cannot find user', 'add API')
    return 'Error'
  }

  return ttsClient.post(user.id, text)
  //return pollyService.post(user.id, text)
}
