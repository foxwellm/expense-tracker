'use client'

import Button from '@mui/material/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export function HomeButton() {
  const router = useRouter()
  return (
    <Button
      disableRipple
      onClick={() => router.push('/')}
      sx={{
        borderRadius: 2,
        '&:hover': {
          backgroundColor: 'inherit',
        },
      }}
    >
      <Image src="/FETIcon.png" alt="FETIcon" width={28} height={28} />
    </Button>
  )
}
