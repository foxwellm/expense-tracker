'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useDrawerState } from '@/store'

import { BarChartContainer } from './_components'

export default function BarChartPage() {
  const searchParams = useSearchParams()
  const shouldOpneSidebar = searchParams.get('sidebar') === 'open'
  const openDrawer = useDrawerState((s) => s.openDrawer)

  useEffect(() => {
    if (shouldOpneSidebar) {
      openDrawer()
    }
  }, [shouldOpneSidebar, openDrawer])

  return <BarChartContainer />
}
