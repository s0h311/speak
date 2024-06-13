'use server'

import logger from '@/lib/logger'
import { supabaseUser } from './supabase/supabaseUser'
import ObjectService from '../services/objectService'

export default async function list(): Promise<{ updatedAt: Date | undefined; url: string }[]> {
  logger.info('LIST ENDPOINT CALLED')

  const objectService = new ObjectService()

  const user = await supabaseUser()

  if (!user) {
    logger.error('Unable to show list, cannot find user', 'list API')
    return []
  }

  return objectService.get(user.id)
}
