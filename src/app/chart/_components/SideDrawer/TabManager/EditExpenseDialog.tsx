import { Stack } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickerValue } from '@mui/x-date-pickers/internals'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { expenseCategories } from '@/lib/constants/expenses'
import { getSubCategories } from '@/lib/utils/expense'
import { Expense, ExpenseCategory } from '@/types/expense'

import { UpdateExpenseVariables } from './EditExpenses'

export function EditExpenseDialog({
  open,
  expense,
  onClose,
  onUpdate,
}: {
  open: boolean
  expense: Expense | null
  onClose: () => void
  onUpdate: (updateExpenseVariables: UpdateExpenseVariables) => void
}) {
  const furthestPastDate = dayjs().subtract(2, 'years')

  const [expenseId, setExpenseId] = useState<Expense['id'] | ''>('')
  const [date, setDate] = useState<PickerValue>(null)
  const [category, setCategory] = useState<ExpenseCategory | ''>('')
  const [subCategory, setSubCategory] = useState<string>('')
  const [cost, setCost] = useState<string>('')
  const [note, setNote] = useState<string>('')

  useEffect(() => {
    if (expense) {
      setExpenseId(expense.id)
      setDate(dayjs(expense.date))
      setCategory(expense.category)
      setSubCategory(expense.sub_category)
      setCost((expense.cost_in_cents / 100).toFixed(2))
      setNote(expense?.note || '')
    }
  }, [expense])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !subCategory.length || category === '') return

    const formattedDate = date.format('YYYY-MM-DD')

    onUpdate({
      variables: {
        expenseId,
        expense: {
          date: formattedDate,
          category,
          sub_category: subCategory,
          cost_in_cents: Math.round(parseFloat(cost) * 100),
          note: note.trim().length ? note : undefined,
        },
      },
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: handleSubmit,
          sx: {
            width: 320,
            p: 0.5,
          },
        },
      }}
    >
      <DialogContent>
        <Stack spacing={1.5}>
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
            onChange={(e) => {
              setCategory(e.target.value as ExpenseCategory)
              setSubCategory('')
            }}
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
            {category === ''
              ? ''
              : getSubCategories(category).map((expenseCategory) => (
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          onClick={onClose}
          disabled={
            !date ||
            cost === '' ||
            parseFloat(cost) === 0 ||
            !subCategory.length ||
            !category.length
          }
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={
            !date ||
            cost === '' ||
            parseFloat(cost) === 0 ||
            !subCategory.length ||
            !category.length
          }
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}
