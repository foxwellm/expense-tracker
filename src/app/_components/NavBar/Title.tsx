'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function Title() {
  const router = useRouter()

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
        <Box
          sx={{
            width: 'clamp(20px, 5vw, 34px)',
            height: 'clamp(20px, 5vw, 34px)',
            position: 'relative',
          }}
        >
          <Image
            src="/FETIcon.png"
            alt="FETIcon"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Box>
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
