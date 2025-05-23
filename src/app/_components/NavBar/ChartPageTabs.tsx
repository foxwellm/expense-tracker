'use client'

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const barChartPath = '/chart/bar'
const sunburstChartPath = '/chart/sunburst'

export default function ChartPageTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState(-1)

  useEffect(() => {
    switch (pathname) {
      case barChartPath:
        setValue(0)
        break
      case sunburstChartPath:
        setValue(1)
        break
      default:
        setValue(-1)
    }
  }, [pathname])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        router.push(barChartPath)
        break
      case 1:
        router.push(sunburstChartPath)
        break
    }
  }

  return (
    <Tabs value={value} onChange={handleChange} aria-label="expense chart tabs">
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
