'use client'

import { useMutation } from '@apollo/client'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useSnackbar } from 'notistack'
import { useEffect } from 'react'

import { DELETE_USER_EXPENSES } from '@/app/api/graphql/mutations'
import { GET_COMBINED_EXPENSES } from '@/app/api/graphql/queries'

export function DeleteExpenses() {
  const { enqueueSnackbar } = useSnackbar()
  const [deleteUserExpenses, { data, loading, error }] = useMutation(
    DELETE_USER_EXPENSES,
    {
      refetchQueries: [GET_COMBINED_EXPENSES],
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
    <Box>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h6">Delete Expenses</Typography>
        <Box width={'100%'} sx={{ position: 'relative' }}>
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
      </Stack>
    </Box>
  )
}
