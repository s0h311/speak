'use client'

import { useSupabaseClient } from '@/hooks/useSupabaseClient'
import { useSupabaseUser } from '@/hooks/useSupabaseUser'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type NavbarProps = {
  className: string
}

export default function Navbar({ className }: NavbarProps) {
  const supabase = useSupabaseClient()
  const router = useRouter()
  const user = useSupabaseUser()

  const links = [
    { title: 'Home', path: '/' },
    { title: 'List', path: '/list' },
  ]

  async function logout(): Promise<void> {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <nav className={cn('bg-base-300 w-fit py-4 px-5 rounded-lg space-x-10', className)}>

      {user && links.map(({ title, path }) => (
        <Link
          key={path}
          href={path}
        >
          {title}
        </Link>
      ))}

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link href='/signup'>Signup</Link>
          <Link href='/login'>Login</Link>
        </>
      )}
    </nav>
  )
}
