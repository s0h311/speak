'use server'

import logger from '@/lib/logger'
import { supabaseUser } from './supabase/supabaseUser'
import ObjectService from '../services/objectService'

export default async function remove(fileUrl: string): Promise<void> {
  logger.info('DELETE ENDPOINT CALLED')

  const objectService = new ObjectService()

  let fileName = fileUrl.split('/').pop()

  const user = await supabaseUser()

  if (!fileName) {
    logger.error('Unable to remove, cannot find fileName')
    return
  }

  if (!user) {
    logger.error('Unable to remove, cannot find user', 'Remove API')
    return
  }

  if (!fileName.includes(user.id)) {
    return
  }

  fileName = fileName.replace('%2F', '/')

  await objectService.remove(fileName)
  return
}
