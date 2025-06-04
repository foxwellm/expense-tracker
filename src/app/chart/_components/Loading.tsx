'use client'

import Skeleton from '@mui/material/Skeleton'
import Slider from '@mui/material/Slider'

import { useBreakpoint, useIsHydrated } from '@/app/_hooks'

import { ChartLayout } from './ChartLayout'

const marks = [
  {
    value: 11,
    label: 'May 25',
  },
]

function SliderLoading() {
  const { isMobile, isTablet } = useBreakpoint()
  return (
    <>
      <Skeleton
        variant="rectangular"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 4,
        }}
      />
      {/* Mimic actual Slider */}
      <Slider
        marks={marks}
        size={isMobile ? 'small' : 'medium'}
        orientation={isTablet ? 'horizontal' : 'vertical'}
        min={0}
        max={11}
        step={1}
        sx={{
          visibility: 'hidden',
          ...(isTablet
            ? {
                '& .MuiSlider-markLabel': {
                  transform: 'rotate(45deg) translateY(100%)',
                  fontSize: 12,
                },
              }
            : {}),
        }}
      ></Slider>
    </>
  )
}

export function Loading({ width, height }: { width: number; height: number }) {
  const { isHydrated } = useIsHydrated()

  if (!isHydrated) return null

  return (
    <ChartLayout slider={<SliderLoading />}>
      {/* Mimic actual chart */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 4,
        }}
      />
    </ChartLayout>
  )
}
