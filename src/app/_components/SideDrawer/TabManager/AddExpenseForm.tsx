'use client'

import { useMutation } from '@apollo/client'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { ADD_EXPENSES } from '@/app/api/graphql/mutations'
import { GET_COMBINED_EXPENSES } from '@/app/api/graphql/queries'
import { expenseCategories } from '@/lib/constants/expenses'
import { ExpenseCategory } from '@/types/expense'

export function AddExpenseForm() {
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const currentDate = dayjs().format('YYYY-MM-DD')
  const furthestPastDate = dayjs().subtract(2, 'years').format('YYYY-MM-DD')

  const [date, setDate] = useState(currentDate)
  const [category, setCategory] = useState<ExpenseCategory>('Food')
  const [cost, setCost] = useState<string>('23.46')

  const [addExpense, { data, loading, error }] = useMutation(ADD_EXPENSES, {
    refetchQueries: [GET_COMBINED_EXPENSES],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    addExpense({
      variables: {
        expenses: [
          {
            date,
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
        {/* TODO: add success and error to a Snackbar */}
        {/* {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Expense added!</Alert>} */}

        <TextField
          label="Date"
          type="date"
          value={date}
          fullWidth
          onChange={(e) => setDate(e.target.value)}
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
            disabled={loading}
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
