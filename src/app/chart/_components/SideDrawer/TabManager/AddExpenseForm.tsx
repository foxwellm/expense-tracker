'use client'

import { useMutation } from '@apollo/client'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickerValue } from '@mui/x-date-pickers/internals'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { ADD_EXPENSES } from '@/app/api/graphql/mutations'
import { expenseCategories } from '@/lib/constants/expenses'
import { getSubCategories } from '@/lib/utils/expense'
import { useExpensesStore } from '@/store'
import { ExpenseCategory } from '@/types/expense'

export function AddExpenseForm() {
  const { enqueueSnackbar } = useSnackbar()
  const refetch = useExpensesStore((s) => s.refetch)
  const currentDate = dayjs()
  const furthestPastDate = dayjs().subtract(2, 'years')

  const [date, setDate] = useState<PickerValue>(currentDate)
  const [category, setCategory] = useState<ExpenseCategory>('Office')
  const [subCategory, setSubCategory] = useState<string>('Furniture')
  const [cost, setCost] = useState<string>('1223.46')
  const [note, setNote] = useState<string>('Corner couch')

  const [addExpense, { data, loading, error }] = useMutation(ADD_EXPENSES, {
    onCompleted: (data) => {
      if (refetch && data) {
        refetch()
      }
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !subCategory.length) return

    const formattedDate = date.format('YYYY-MM-DD')

    addExpense({
      variables: {
        expenses: [
          {
            date: formattedDate,
            category,
            sub_category: subCategory,
            cost_in_cents: Math.round(parseFloat(cost) * 100),
            note: note.trim().length ? note : undefined,
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
      <Stack spacing={3}>
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
          select
          label="Sub Category"
          value={subCategory}
          fullWidth
          onChange={(e) => setSubCategory(e.target.value)}
          required
          sx={{
            label: { color: 'inherit' },
          }}
        >
          {getSubCategories(category).map((expenseCategory) => (
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

        <TextField
          label="Note"
          fullWidth
          multiline
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{
            label: { color: 'inherit' },
          }}
          slotProps={{
            htmlInput: {
              maxLength: 100,
            },
          }}
        />

        <Box width={'100%'} sx={{ position: 'relative' }}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={
              !date || parseFloat(cost) === 0 || !subCategory.length || loading
            }
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
