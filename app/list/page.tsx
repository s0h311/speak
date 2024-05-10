'use client'

import Link from 'next/link'
import list from '../api/list'
import RemoveButton from '@/components/RemoveButton'
import { useSupabaseUser } from '@/hooks/useSupabaseUser'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function List() {
  const user = useSupabaseUser()
  useEffect(() => {
    if (!user) {
      redirect(`/login`)
    }
  }, [user])
  const [audioUrls, setAudioUrls] = useState<string[]>([])
  useEffect(() => {
    (async () => {
      setAudioUrls(await list())
    })()
  })
  if (!user) {
    return ''
  }
  if (audioUrls.length === 0) {
    return <p>No Audios found</p>
  }

  return (
    <table className='table w-fit'>
      <thead>
        <tr>
          <th>URL</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {audioUrls.map((url) => (
          <tr key={url}>
            <td>{url}</td>

            <td className='flex items-center gap-5'>
              <Link
                className='btn btn-accent btn-sm'
                href={url}
                target='_blank'
              >
                open
              </Link>

              <RemoveButton url={url} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
