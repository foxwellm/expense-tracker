'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useBreakpoint } from '@/app/_hooks'

export function Title() {
  const router = useRouter()
  const { logoDimension } = useBreakpoint()

  return (
    <Box
      onClick={() => router.push('/')}
      display={'flex'}
      alignItems={'center'}
      sx={{ cursor: 'pointer' }}
    >
      <Button
        disableRipple
        sx={{
          borderRadius: 2,
          '&:hover': {
            backgroundColor: 'inherit',
          },
        }}
      >
        <Image
          src="/FETIcon.png"
          alt="FETIcon"
          width={logoDimension}
          height={logoDimension}
        />
      </Button>
      <Typography
        variant="largeHeader"
        component="div"
        sx={{
          pointerEvents: 'none',
        }}
      >
        Foxwell Expense Tracker
      </Typography>
    </Box>
  )
}
