'use client'

import { Box, Container } from '@mui/material'

export default function RootPage() {
  return (
    <Box sx={{ minHeight: '100vh', py: 8, backgroundColor: 'background.demo' }}>
      <Container>
        <video
          width="100%"
          height="auto"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          style={{ display: 'block', maxWidth: '100%' }}
          src={'/laptop-demo.webm'}
        />
      </Container>
    </Box>
  )
}
