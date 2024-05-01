'use server'

import S3Service from '../services/s3Service'

export default async function list(): Promise<string[]> {
  const s3Service = new S3Service()

  const userId = 'dummy-user-id'

  return s3Service.get(userId)
}
