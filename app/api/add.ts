'use server'

import logger from '@/lib/logger'
import PollyService from '../services/pollyService'
import { supabaseUser } from './supabase/supabaseUser'

export default async function add(text: string): Promise<string> {
  const pollyService = new PollyService()
  const user = await supabaseUser()

  if (!user) {
    logger.error('Unable to add, cannot find user', 'add API')
    return 'Error'
  }

  return pollyService.post(user.id, text)
}
