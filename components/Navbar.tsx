import { cn } from '@/lib/utils'
import Link from 'next/link'

type NavbarProps = {
  className: string
}

export default function Navbar({ className }: NavbarProps) {
  const links = [
    { title: 'Home', path: '/' },
    { title: 'List', path: '/list' },
  ]
  return (
    <nav className={cn('bg-base-300 w-fit py-4 px-5 rounded-lg space-x-10', className)}>
      {links.map(({ title, path }) => (
        <Link
          key={path}
          href={path}
        >
          {title}
        </Link>
      ))}
    </nav>
  )
}
