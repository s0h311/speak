'use client'

import { useLayoutEffect, useState } from 'react'

type WindowSize = {
  width: number
  height: number
}

export default function useDeviceType() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  })

  const [isMobile, setIsMobile] = useState<boolean>(false)

  useLayoutEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      if (window.innerWidth < 1024) setIsMobile(true)
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    windowSize,
    isMobile,
  }
}
