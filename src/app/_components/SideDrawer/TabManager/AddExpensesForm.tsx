'use client'

import { useMutation } from '@apollo/client'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickerValue } from '@mui/x-date-pickers/internals'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { ADD_EXPENSES } from '@/app/api/graphql/mutations'
import { getMockExpenses } from '@/lib/utils/expense'
import { useExpensesStore } from '@/store'
dayjs.extend(isSameOrAfter)

export function AddExpensesForm() {
  const { enqueueSnackbar } = useSnackbar()
  const { refetch } = useExpensesStore()
  const currentDate = dayjs()
  const furthestPastDate = dayjs().subtract(2, 'years')
  const initialStartDate = dayjs().subtract(3, 'months')

  const [startDate, setStartDate] = useState<PickerValue>(initialStartDate)
  const [endDate, setEndDate] = useState<PickerValue>(currentDate)
  const [quantity, setQuantity] = useState<string>('20')

  const [addExpenses, { data, loading, error }] = useMutation(ADD_EXPENSES, {
    onCompleted: (data) => {
      if (refetch && data) {
        refetch()
      }
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !endDate || startDate.isSameOrAfter(endDate)) return

    const formattedStartDate = startDate.format('YYYY-MM-DD')
    const formattedEndDate = endDate.format('YYYY-MM-DD')

    const mockExpenses = getMockExpenses(
      parseInt(quantity),
      formattedStartDate,
      formattedEndDate
    )

    if (mockExpenses)
      addExpenses({
        variables: {
          expenses: mockExpenses,
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
        <Typography variant="h6">Add Random Expenses</Typography>

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

        <DatePicker
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          disableFuture
          minDate={furthestPastDate}
          label="Start Date"
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
            },
          }}
        />

        <DatePicker
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          disableFuture
          minDate={furthestPastDate}
          label="End Date"
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
            },
          }}
        />

        <Box width={'100%'} sx={{ position: 'relative' }}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={
              !startDate ||
              !endDate ||
              startDate.isSameOrAfter(endDate) ||
              parseFloat(quantity) === 0 ||
              loading
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
