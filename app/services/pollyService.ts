import logger from '@/lib/logger'
import {
  StartSpeechSynthesisTaskCommand,
  type StartSpeechSynthesisTaskCommandInput,
  type StartSpeechSynthesisTaskCommandOutput,
  PollyClient,
} from '@aws-sdk/client-polly'
import { S3_BUCKET_NAME } from '../api/consts'

export default class PollyService {
  private polly: PollyClient

  constructor() {
    this.polly = new PollyClient({ region: 'eu-central-1' })
  }

  public async post(userId: string, text: string): Promise<string> {
    const params: StartSpeechSynthesisTaskCommandInput = {
      OutputFormat: 'mp3',
      OutputS3BucketName: S3_BUCKET_NAME,
      OutputS3KeyPrefix: userId,
      Text: text,
      TextType: 'text',
      VoiceId: 'Vicki',
      SampleRate: '22050',
      LanguageCode: 'de-DE',
    }

    try {
      const res: StartSpeechSynthesisTaskCommandOutput = await this.polly.send(
        new StartSpeechSynthesisTaskCommand(params)
      )

      return res.SynthesisTask?.OutputUri ?? 'Error :D'
    } catch (e) {
      logger.error((e as Error).message, 'TTS API')
    }

    return 'Error :D'
  }
}
