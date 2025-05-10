'use client'

import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export function AddExpenseForm() {
  const [date, setDate] = useState('2025-02-26')
  const [expense, setExpense] = useState('Home')
  const [cost, setCost] = useState<number | ''>(23.45)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const res = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        date,
        expense,
        cost: typeof cost === 'string' ? parseFloat(cost) : cost,
      }),
    })

    const result = await res.json()

    if (!res.ok) {
      setError(result.error || 'Failed to submit expense.')
    } else {
      setSuccess(true)
      setDate('')
      setExpense('')
      setCost('')
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      maxWidth={400}
      mx="auto"
      mt={4}
    >
      <Stack spacing={3}>
        <Typography variant="h6">Add Expense</Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Expense added!</Alert>}

        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />

        <TextField
          label="Category"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          required
        />

        <TextField
          label="Cost"
          type="number"
          inputProps={{ step: '0.01' }}
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
        />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </Box>
  )
}
