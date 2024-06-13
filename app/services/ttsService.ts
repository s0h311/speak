import { TextToSpeechClient } from '@google-cloud/text-to-speech'
import ObjectService from './objectService'
import fs from 'node:fs/promises'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default class TtsService {
  constructor(
    private ttsClient = new TextToSpeechClient({
      keyFilename: './gcp-creds.json',
    }),
    private objectService = new ObjectService()
  ) {}

  public async post(userId: string, text: string): Promise<string> {
    const request = {
      input: { text },
      voice: { languageCode: 'de-DE', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    }

    // eslint-disable-next-line
    // @ts-ignore
    const response = await this.ttsClient.synthesizeSpeech(request)

    const tmpPath = __dirname + '/tmp/'
    const fileName = new Date().getTime() + '.mp3'
    const filePath = tmpPath + fileName

    // eslint-disable-next-line
    // @ts-ignore
    await fs.writeFile(filePath, response[0]['audioContent'])

    const pathInStorage = `${userId}/${fileName}`

    const mediaLink = await this.objectService.post(filePath, pathInStorage)

    await fs.rm(filePath)

    return mediaLink
  }
}
