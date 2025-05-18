'use client'

import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'

import { useExpensesStore } from '@/store'
import { ExpenseCategory } from '@/types/expense'

export function AddExpenseForm() {
  const [date, setDate] = useState('2025-02-26')
  const [category, setCategory] = useState<ExpenseCategory>('Food')
  const [cost, setCost] = useState<string>('23.46')
  const theme = useTheme()

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
    <Box component="form" onSubmit={handleSubmit}>
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
          slotProps={{ inputLabel: { shrink: true } }}
          required
          sx={{
            '& input::-webkit-calendar-picker-indicator': {
              filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)',
            },
            label: { color: 'inherit' },
          }}
        />

        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
          required
          sx={{
            label: { color: 'inherit' },
          }}
        />

        <TextField
          label="Cost"
          type="number"
          slotProps={{ htmlInput: { step: '0.01', min: '0.01' } }}
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
          sx={{
            label: { color: 'inherit' },
          }}
        />

        <Button type="submit" variant="contained" disabled={mutationLoading}>
          Submit
        </Button>
      </Stack>
    </Box>
  )
}
