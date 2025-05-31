'use client'

import { useMutation } from '@apollo/client'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'

import { DELETE_USER_EXPENSES } from '@/app/api/graphql/mutations'
import { useExpensesStore } from '@/store'

export function DeleteAllExpenses() {
  const { enqueueSnackbar } = useSnackbar()
  const refetch = useExpensesStore((s) => s.refetch)
  const setIsRenderReady = useExpensesStore((s) => s.setIsRenderReady)
  const [deleteUserExpenses, { data, loading, error }] = useMutation(
    DELETE_USER_EXPENSES,
    {
      onCompleted: (data) => {
        if (refetch && data) {
          setIsRenderReady(false)
          refetch()
        }
      },
    }
  )

  useEffect(() => {
    if (data) {
      enqueueSnackbar('Expenses Deleted', { variant: 'success' })
    }

    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }, [data, error, enqueueSnackbar])

  return (
    <Box width={'100%'}>
      <Button
        onClick={() => deleteUserExpenses()}
        fullWidth
        variant="contained"
        color="error"
        disabled={loading}
      >
        Delete all expenses
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
  )
}
