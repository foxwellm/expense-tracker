'use client'

import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'

import { getMockExpenses } from '@/lib/utils/expense'
import { useExpensesStore } from '@/store'

export function AddExpensesForm() {
  const [startDate, setStartDate] = useState('2025-02-26')
  const [endDate, setEndDate] = useState('2025-02-26')
  const [quantity, setQuantity] = useState<string>('23')
  const theme = useTheme()

  const { mutationLoading, addExpenses } = useExpensesStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const mockExpenses = getMockExpenses(parseInt(quantity), startDate, endDate)

    if (mockExpenses) addExpenses(mockExpenses)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Typography variant="h6">Add Random Expenses</Typography>

        {/* TODO: add success and error to a Snackbar */}
        {/* {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Expense added!</Alert>} */}

        <TextField
          label="Quantity"
          type="number"
          slotProps={{ htmlInput: { min: '1' } }}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          sx={{
            label: { color: 'inherit' },
          }}
        />

        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
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
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          required
          sx={{
            '& input::-webkit-calendar-picker-indicator': {
              filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)',
            },
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
