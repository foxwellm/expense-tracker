'use client'

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useBreakpoint } from '@/app/_hooks'

const barChartPath = '/chart/bar'
const sunburstChartPath = '/chart/sunburst'

export function ChartPageTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const { isSmallTablet } = useBreakpoint()
  const [value, setValue] = useState<number | 'none'>('none')

  useEffect(() => {
    switch (pathname) {
      case barChartPath:
        setValue(1)
        break
      case sunburstChartPath:
        setValue(2)
        break
      default:
        setValue('none')
    }
  }, [pathname])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 1:
        setValue(1)
        router.push(barChartPath)
        break
      case 2:
        setValue(2)
        router.push(sunburstChartPath)
        break
    }
  }

  return (
    <Tabs
      variant={isSmallTablet ? 'fullWidth' : 'standard'}
      value={value}
      onChange={handleChange}
      aria-label="expense chart tabs"
    >
      <Tab sx={{ display: 'none' }} value={'none'} />
      <Tab
        id="bar-chart-tab"
        aria-controls="tabpanel-bar-chart"
        label="Bar Chart"
      />
      <Tab
        id="sunburst-chart-tab"
        aria-controls="tabpanel-sunburst-chart"
        label="Sunburst Chart"
      />
    </Tabs>
  )
}
