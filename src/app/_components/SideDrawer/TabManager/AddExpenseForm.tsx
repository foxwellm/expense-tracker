'use client'

import { useMutation } from '@apollo/client'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickerValue } from '@mui/x-date-pickers/internals'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { ADD_EXPENSES } from '@/app/api/graphql/mutations'
import { expenseCategories } from '@/lib/constants/expenses'
import { useExpensesStore } from '@/store'
import { ExpenseCategory } from '@/types/expense'

export function AddExpenseForm() {
  const { enqueueSnackbar } = useSnackbar()
  const { refetch } = useExpensesStore()
  const currentDate = dayjs()
  const furthestPastDate = dayjs().subtract(2, 'years')

  const [date, setDate] = useState<PickerValue>(currentDate)
  const [category, setCategory] = useState<ExpenseCategory>('Food')
  const [cost, setCost] = useState<string>('23.46')

  const [addExpense, { data, loading, error }] = useMutation(ADD_EXPENSES, {
    onCompleted: (data) => {
      if (refetch && data) {
        refetch()
      }
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date) return

    const formattedDate = date.format('YYYY-MM-DD')

    addExpense({
      variables: {
        expenses: [
          {
            date: formattedDate,
            category,
            cost_in_cents: Math.round(parseFloat(cost) * 100),
          },
        ],
      },
    })
  }

  useEffect(() => {
    if (data) {
      enqueueSnackbar('Expense Added', { variant: 'success' })
    }

    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }, [data, error, enqueueSnackbar])

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h6">Add Expense</Typography>

        <DatePicker
          value={date}
          onChange={(newValue) => setDate(newValue)}
          disableFuture
          minDate={furthestPastDate}
          label="Date"
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
            },
          }}
        />

        <TextField
          select
          label="Category"
          value={category}
          fullWidth
          onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
          required
          sx={{
            label: { color: 'inherit' },
          }}
        >
          {expenseCategories.map((expenseCategory) => (
            <MenuItem key={expenseCategory} value={expenseCategory}>
              {expenseCategory}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Cost"
          type="number"
          fullWidth
          slotProps={{ htmlInput: { step: '0.01', min: '0.01' } }}
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
          sx={{
            label: { color: 'inherit' },
          }}
        />

        <Box width={'100%'} sx={{ position: 'relative' }}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={!date || parseFloat(cost) === 0 || loading}
          >
            Add
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Stack>
    </Box>
  )
}
