'use client'

import { useEffect, useState } from 'react'

export function useIsHydrated() {
  const [isHydrated, setIsHydated] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsHydated(true)
      })
    })
  }, [])

  return { isHydrated }
}
