import { Storage } from '@google-cloud/storage'

export default class ObjectService {
  constructor(
    private storage = new Storage({
      keyFilename: './gcp-creds.json',
    })
  ) {}

  public async post(pathToFile: string, fileName: string): Promise<string> {
    const response = await this.storage
      .bucket('speak-audio-files-clx694jvi00010cl2chks2epg')
      .upload(pathToFile, { destination: fileName })

    return response[0].metadata.mediaLink ?? 'Error :D'
  }

  public async get(folderName: string): Promise<{ updatedAt: Date | undefined; url: string }[]> {}

  public async remove(fileName: string): Promise<void> {}
}
