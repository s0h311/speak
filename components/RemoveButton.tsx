'use client'

import remove from '@/app/api/delete'
import { useRouter } from 'next/navigation'

export default function RemoveButton({ url }: { url: string }) {
  const router = useRouter()

  async function handleRemove(url: string): Promise<void> {
    await remove(url)
    router.refresh()
  }

  return (
    <button
      className='btn btn-error btn-outline btn-sm'
      onClick={() => handleRemove(url)}
    >
      remove
    </button>
  )
}
