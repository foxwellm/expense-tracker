'use client'

import { useMutation } from '@apollo/client'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import { useState } from 'react'

import { ADD_EXPENSES } from '@/app/api/graphql/mutations'
import { GET_COMBINED_EXPENSES } from '@/app/api/graphql/queries'
import { getMockExpenses } from '@/lib/utils/expense'

export function AddExpensesForm() {
  const currentDate = dayjs().format('YYYY-MM-DD')
  const furthestPastDate = dayjs().subtract(2, 'years').format('YYYY-MM-DD')
  const initialStartDate = dayjs().subtract(3, 'months').format('YYYY-MM-DD')

  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(currentDate)
  const [quantity, setQuantity] = useState<string>('20')
  const theme = useTheme()

  const [addExpenses, { loading }] = useMutation(ADD_EXPENSES, {
    refetchQueries: [GET_COMBINED_EXPENSES],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const mockExpenses = getMockExpenses(parseInt(quantity), startDate, endDate)

    if (mockExpenses)
      addExpenses({
        variables: {
          expenses: mockExpenses,
        },
      })
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h6">Add Random Expenses</Typography>

        {/* TODO: add success and error to a Snackbar */}
        {/* {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Expense added!</Alert>} */}

        <TextField
          label="Quantity"
          type="number"
          fullWidth
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
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { max: currentDate, min: furthestPastDate },
          }}
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
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
            htmlInput: { max: currentDate, min: furthestPastDate },
          }}
          required
          sx={{
            '& input::-webkit-calendar-picker-indicator': {
              filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)',
            },
            label: { color: 'inherit' },
          }}
        />

        <Button fullWidth type="submit" variant="contained" disabled={loading}>
          Add
        </Button>
      </Stack>
    </Box>
  )
}
