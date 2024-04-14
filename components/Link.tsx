'use client'

import { usePathname, useRouter } from 'next/navigation'
import { cn, scrollIntoViewUsingPath } from '../lib/utils'
import useDeviceType from '@/lib/useDeviceType'

type LinkProps = {
  className?: string
  href: `/${string}`
  onClick?: () => void
  children: React.ReactNode
}

export default function Link({ className, href, onClick, children }: LinkProps) {
  const router = useRouter()
  const path = usePathname()
  const { isMobile } = useDeviceType()

  function handleClick() {
    if (onClick) {
      onClick()
    }

    if (href.includes('#') && path !== '/') {
      router.push('/')

      setTimeout(() => {
        scrollIntoViewUsingPath(href)
      }, 400)
      return
    }

    const scrollPosition = isMobile ? 'start' : 'center'

    if (href.includes('#')) {
      scrollIntoViewUsingPath(href, scrollPosition)
      return
    }

    router.push(href)
  }

  return (
    <a
      className={cn('cursor-pointer', className)}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
