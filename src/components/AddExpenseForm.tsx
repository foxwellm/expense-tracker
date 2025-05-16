'use client'

import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import { Expense, ExpenseCategory } from '@/types/expense'

export function AddExpenseForm({
  onSubmit,
  loading,
}: {
  onSubmit: (expense: Expense) => Promise<void>
  loading: boolean
}) {
  const [date, setDate] = useState('2025-02-26')
  const [category, setCategory] = useState<ExpenseCategory>('Food')
  const [cost, setCost] = useState<string>('23.46')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      await onSubmit({
        date,
        category,
        cost_in_cents: Math.round(parseFloat(cost) * 100),
      })

      setSuccess(true)
      // setDate('')
      // setCategory('')
      // setCost('')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to submit expense.')
      }
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
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
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

        <Button type="submit" variant="contained" disabled={loading}>
          Submit
        </Button>
      </Stack>
    </Box>
  )
}
