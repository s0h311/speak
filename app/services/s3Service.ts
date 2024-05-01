import logger from '@/lib/logger'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3'

export default class S3Service {
  private s3: S3Client

  constructor() {
    this.s3 = new S3Client({ region: 'eu-central-1' })
  }

  public async get(userId: string): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: 'speak-audio-files',
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
}
