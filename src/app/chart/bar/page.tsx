'use client'

import { use, useEffect } from 'react'

import { useDrawerState } from '@/store'

import { BarChartContainer } from './_components'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default function BarChartPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const shouldOpneSidebar = use(searchParams).sidebar === 'open'
  const openDrawer = useDrawerState((s) => s.openDrawer)

  useEffect(() => {
    if (shouldOpneSidebar) {
      openDrawer()
    }
  }, [shouldOpneSidebar, openDrawer])

  return <BarChartContainer />
}
