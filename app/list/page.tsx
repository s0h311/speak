import Link from 'next/link'
import list from '../api/list'
import RemoveButton from '@/components/RemoveButton'

export default async function List() {
  const audioUrls = await list()

  if (audioUrls.length === 0) {
    return <p>No Audios found</p>
  }

  return (
    <table className='table w-fit'>
      <thead>
        <tr>
          <th>Nr</th>
          <th>Date</th>
          <th>Play</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {audioUrls.map(({ url, updatedAt }, index) => (
          <tr key={url}>
            <td>{index + 1}</td>
            <td>{updatedAt ? updatedAt.toLocaleDateString() : ''}</td>

            <td>
              <audio
                className='rounded-lg'
                controls
                src={url}
              ></audio>
            </td>

            <td className='flex items-center gap-5'>
              <RemoveButton url={url} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
