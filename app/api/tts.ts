'use server'

import logger from '@/lib/logger'
import {
  StartSpeechSynthesisTaskCommand,
  type StartSpeechSynthesisTaskCommandInput,
  type StartSpeechSynthesisTaskCommandOutput,
  PollyClient,
} from '@aws-sdk/client-polly'

const polly = new PollyClient({ region: 'eu-central-1' })

export default async function tts(text: string): Promise<string> {
  const params: StartSpeechSynthesisTaskCommandInput = {
    OutputFormat: 'mp3',
    OutputS3BucketName: 'speak-audio-files',
    Text: text,
    TextType: 'text',
    VoiceId: 'Vicki',
    SampleRate: '22050',
    LanguageCode: 'de-DE',
  }

  try {
    const res: StartSpeechSynthesisTaskCommandOutput = await polly.send(new StartSpeechSynthesisTaskCommand(params))

    console.log(res.SynthesisTask?.OutputUri)

    return res.SynthesisTask?.OutputUri ?? 'Error :D'
  } catch (e) {
    logger.error((e as Error).message, 'TTS API')
  }

  return 'Error :D'
}
