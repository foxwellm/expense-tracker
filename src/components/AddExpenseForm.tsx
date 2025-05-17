'use client'

import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import { useExpensesStore } from '@/store'
import { ExpenseCategory } from '@/types/expense'

export function AddExpenseForm() {
  const [date, setDate] = useState('2025-02-26')
  const [category, setCategory] = useState<ExpenseCategory>('Food')
  const [cost, setCost] = useState<string>('23.46')

  const { mutationLoading, addExpense } = useExpensesStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    addExpense({
      date,
      category,
      cost_in_cents: Math.round(parseFloat(cost) * 100),
    })
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

        {/* TODO: add success and error to a Snackbar */}
        {/* {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Expense added!</Alert>} */}

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

        <Button type="submit" variant="contained" disabled={mutationLoading}>
          Submit
        </Button>
      </Stack>
    </Box>
  )
}
