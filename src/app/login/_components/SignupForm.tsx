'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'

export function SignupForm({
  onSignup,
}: {
  onSignup: (formData: FormData) => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })

  useEffect(() => {
    const newErrors = { email: '', password: '' }

    if (!email.includes('@') && email.length) {
      newErrors.email = 'Enter a valid email'
    }

    if (password.length < 6 && password.length) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
  }, [email, password])

  const hasErrors = Boolean(errors.email || errors.password)

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
        Sign up
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
        error={Boolean(errors.email)}
        helperText={errors.email}
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
        error={Boolean(errors.password)}
        helperText={errors.password}
      />

      <Button
        type="submit"
        formAction={onSignup}
        variant="outlined"
        color="secondary"
        disabled={hasErrors || !email.length || !password.length}
      >
        Sign up
      </Button>
    </Box>
  )
}
