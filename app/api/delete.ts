'use server'

import logger from '@/lib/logger'
import S3Service from '../services/s3Service'
import { supabaseUser } from './supabase/supabaseUser'

export default async function remove(fileUrl: string): Promise<void> {
  logger.info('DELETE ENDPOINT CALLED')

  const s3Service = new S3Service()

  const fileName = fileUrl.split('/').pop()
  const fileOwner = fileName?.split('.')[0]

  const user = await supabaseUser()

  if (!fileName) {
    logger.error('Unable to remove, cannot find fileName')
    return
  }

  if (!user) {
    logger.error('Unable to remove, cannot find user', 'Remove API')
    return
  }

  if (fileOwner !== user.id) {
    return
  }

  await s3Service.remove(fileName)
  return
}
