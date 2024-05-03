'use server'

import logger from '@/lib/logger'
import S3Service from '../services/s3Service'
import { supabaseUser } from './hooks/supabaseUser'

export default async function list(): Promise<string[]> {
  const s3Service = new S3Service()

  const user = await supabaseUser()

  if (!user) {
    logger.error('Unable to add, cannot find user', 'add API')
    return []
  }

  return s3Service.get(user.id)
}
