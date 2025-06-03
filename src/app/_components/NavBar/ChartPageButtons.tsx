'use client'

import { Box, Button, ButtonGroup } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const chartOptions = {
  'Bar Chart': '/chart/bar',
  'Sunburst Chart': '/chart/sunburst',
}

type ChartType = keyof typeof chartOptions

const getChartTypeFromPath = (path: string): ChartType | null => {
  const entry = Object.entries(chartOptions).find(([, value]) => value === path)
  return entry ? (entry[0] as ChartType) : null
}

export const ChartPageButtons = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [active, setActive] = useState<ChartType | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })

  const underlineButton = useCallback(
    (label: ChartType, isChartSelected: boolean) => {
      if (!containerRef.current) return

      const targetBtn = containerRef.current.querySelector(
        `button[data-label="${label}"]`
      ) as HTMLElement

      if (!targetBtn) return

      const { offsetLeft, offsetWidth } = targetBtn

      if (isChartSelected) {
        setUnderlineStyle({ left: offsetLeft, width: offsetWidth })
      } else {
        setUnderlineStyle({ left: offsetLeft, width: offsetWidth })

        const center = offsetLeft + offsetWidth / 2
        setUnderlineStyle({ left: center, width: 0 })

        requestAnimationFrame(() => {
          setUnderlineStyle({ left: offsetLeft, width: offsetWidth })
        })
      }
    },
    [containerRef]
  )

  useEffect(() => {
    const chartType = getChartTypeFromPath(pathname)

    if (chartType === active) return

    setActive(chartType)

    if (chartType !== null) {
      underlineButton(chartType, active !== null)
    }
  }, [pathname, underlineButton, active])

  const handleClick = (label: ChartType) => {
    router.push(chartOptions[label])
  }

  return (
    <Box sx={{ position: 'relative' }} ref={containerRef}>
      <ButtonGroup
        variant="text"
        sx={{
          '& .MuiButton-root': {
            border: 'none',
          },
        }}
      >
        {Object.keys(chartOptions).map((label) => (
          <Button
            key={label}
            data-label={label}
            onClick={() => handleClick(label as ChartType)}
            size="large"
            disableRipple
            sx={{
              color: active === label ? 'primary.main' : 'text.secondary',
              px: 2,
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
      {active && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            height: '2px',
            bgcolor: 'primary.main',
            transition: 'left 0.3s ease, width 0.3s ease',
            ...underlineStyle,
          }}
        />
      )}
    </Box>
  )
}
