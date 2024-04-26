'use client'

import { useState } from 'react'
import tts from './api/tts'

export default function Home() {
  const [text, setText] = useState<string>('')
  const [outputUri, setOutputUri] = useState<string>('')

  async function handleSubmit(): Promise<void> {
    const result = await tts(text)

    setOutputUri(result)
  }

  return (
    <section className='grid place-items-center gap-10'>
      <h1>Speak</h1>

      <textarea
        placeholder='Something'
        className='textarea textarea-bordered textarea-lg w-full max-w-xs'
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <button
        className='btn btn-active btn-primary'
        onClick={handleSubmit}
      >
        Get Audio
      </button>

      {
        // TODO CORS konfigurieren EC2
      }
      {outputUri && false && (
        <audio
          controls
          src={outputUri}
        ></audio>
      )}

      <p>{outputUri}</p>
    </section>
  )
}
