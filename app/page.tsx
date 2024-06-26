'use client'

import { useState } from 'react'
import add from './api/add'

export default function Home() {
  const [text, setText] = useState<string>('')
  const [outputUri, setOutputUri] = useState<string>('')

  async function handleSubmit(): Promise<void> {
    const result = await add(text)

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

      {outputUri && (
        <audio
          controls
          src={outputUri}
        ></audio>
      )}
    </section>
  )
}
