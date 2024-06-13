import { Storage, type GetFilesOptions } from '@google-cloud/storage'
import { GCS_BUCKET_NAME } from '../api/consts'

export default class ObjectService {
  constructor(
    private storage = new Storage({
      keyFilename: './gcp-creds.json',
    })
  ) {}

  public async post(pathToFile: string, fileName: string): Promise<string> {
    const response = await this.storage.bucket(GCS_BUCKET_NAME).upload(pathToFile, { destination: fileName })

    return response[0].metadata.mediaLink ?? 'Error :D'
  }

  public async get(prefix: string): Promise<{ updatedAt: Date | undefined; url: string }[]> {
    const query: GetFilesOptions = {
      prefix,
    }

    const response = await this.storage.bucket(GCS_BUCKET_NAME).getFiles(query)

    const result = response[0].map((file) => ({
      url: file.publicUrl(),
      updatedAt: new Date(file.metadata.timeCreated!),
    }))

    return result
  }

  public async remove(fileName: string): Promise<void> {
    await this.storage.bucket(GCS_BUCKET_NAME).file(fileName).delete()
  }
}
