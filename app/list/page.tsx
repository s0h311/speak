import Link from 'next/link'
import list from '../api/list'

export default async function List() {
  const audioUrls = await list()

  if (audioUrls.length === 0) {
    return <p>No Audios found</p>
  }

  return (
    <table className='table w-fit'>
      <thead>
        <tr>
          <th>URL</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {audioUrls.map((url) => (
          <tr key={url}>
            <td>{url}</td>

            <Link
              className='btn btn-accent btn-sm'
              href={url}
              target='_blank'
            >
              open
            </Link>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
