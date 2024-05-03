import logger from '@/lib/logger'
import { S3Client, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { S3_BUCKET_NAME } from '../api/consts'

export default class S3Service {
  private s3: S3Client

  constructor() {
    this.s3 = new S3Client({ region: 'eu-central-1' })
  }

  public async get(userId: string): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: S3_BUCKET_NAME,
      Prefix: userId,
    })

    const { Contents } = await this.s3.send(command)

    if (!Contents) {
      logger.error('cannot get storge objects', 'S3Service')
      return []
    }

    const res = Contents.map((content) => `https://s3.eu-central-1.amazonaws.com/speak-audio-files/${content.Key}`)

    return res
  }

  public async remove(fileName: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
    })

    const result = await this.s3.send(command)

    if (!result.$metadata.httpStatusCode || result.$metadata.httpStatusCode > 399) {
      logger.error('Unable to remove, unknown error occurred')
    }
  }
}
