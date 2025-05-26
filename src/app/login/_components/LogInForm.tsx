'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

export function LogInForm({
  onLogIn,
}: {
  onLogIn: (formData: FormData) => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        gap: 2,
        width: 280,
        mt: 4,
        py: 3,
        px: 4,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center">
        Log In
      </Typography>

      <TextField
        id="email"
        name="email"
        label="Email"
        type="email"
        required
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        required
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        formAction={onLogIn}
        variant="contained"
        color="primary"
        disabled={!email.length || !password.length}
      >
        Log In
      </Button>
    </Box>
  )
}
