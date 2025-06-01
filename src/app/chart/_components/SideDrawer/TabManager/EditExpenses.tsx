'use client'

import { useMutation } from '@apollo/client'
import Stack from '@mui/material/Stack'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { UPDATE_EXPENSE } from '@/app/api/graphql/mutations'
import { useExpensesStore } from '@/store'
import { Expense, UpdateExpense } from '@/types/expense'

import { EditExpenseDialog } from './EditExpenseDialog'
import { ExpenseCard } from './ExpenseCard'

export interface UpdateExpenseVariables {
  variables: {
    expenseId: Expense['id']
    expense: UpdateExpense
  }
}

export function EditExpenses() {
  const { enqueueSnackbar } = useSnackbar()
  const userExpenses = useExpensesStore((s) => s.userExpenses)
  const refetch = useExpensesStore((s) => s.refetch)
  const setIsRenderReady = useExpensesStore((s) => s.setIsRenderReady)
  const isRenderReady = useExpensesStore((s) => s.isRenderReady)

  const [open, setOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null)

  const [updateExpense, { data, error }] = useMutation(UPDATE_EXPENSE, {
    onCompleted: (data) => {
      if (refetch && data?.updateExpense) {
        refetch()
      }
    },
  })

  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedExpense(null)
  }

  const handleUpdate = (updateExpenseVariables: UpdateExpenseVariables) => {
    setOpen(false)
    setIsRenderReady(false)
    updateExpense(updateExpenseVariables)
  }

  useEffect(() => {
    if (isRenderReady) {
      setSelectedExpense(null)
    }
  }, [isRenderReady])

  useEffect(() => {
    if (data) {
      enqueueSnackbar('Expense Updated', { variant: 'success' })
    }
  }, [data, enqueueSnackbar])

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }, [error, enqueueSnackbar])

  if (!userExpenses) return <></>

  return (
    <>
      <Stack spacing={1}>
        {userExpenses.map((userExpense) => {
          return (
            <ExpenseCard
              key={userExpense.id}
              {...userExpense}
              onEdit={() => handleEdit(userExpense)}
              isUpdateLoading={
                userExpense.id === selectedExpense?.id && !isRenderReady
              }
            />
          )
        })}
      </Stack>
      <EditExpenseDialog
        open={open}
        expense={selectedExpense}
        onClose={handleClose}
        onUpdate={handleUpdate}
      />
    </>
  )
}
