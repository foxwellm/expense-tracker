import { useMutation } from '@apollo/client'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import { DELETE_USER_EXPENSE } from '@/app/api/graphql/mutations'
import { expenseCategoryColors } from '@/lib/constants/expenses'
import { useExpensesStore } from '@/store'
import { Expense, ExpenseCategory } from '@/types/expense'

const color = (category: ExpenseCategory) => {
  return expenseCategoryColors[category]
}

export function ExpenseCard({
  id,
  date,
  category,
  sub_category,
  cost_in_cents,
  note,
  onEdit,
  isUpdateLoading,
}: Expense & { onEdit: () => void; isUpdateLoading: boolean }) {
  const { enqueueSnackbar } = useSnackbar()
  const setIsRenderReady = useExpensesStore((s) => s.setIsRenderReady)
  const isRenderReady = useExpensesStore((s) => s.isRenderReady)
  const refetch = useExpensesStore((s) => s.refetch)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const [deleteUserExpense, { data, error }] = useMutation(
    DELETE_USER_EXPENSE,
    {
      onCompleted: (data) => {
        if (data?.deleteUserExpense) {
          refetch()
        }
      },
    }
  )

  useEffect(() => {
    // NOTE: In case error and card not deleted
    if (isRenderReady) {
      setIsDeleteLoading(false)
    }
  }, [isRenderReady])

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }, [error, enqueueSnackbar])

  useEffect(() => {
    if (data) {
      enqueueSnackbar('Expense Deleted', { variant: 'success' })
    }
  }, [data, enqueueSnackbar])

  const handleDeleteExpense = () => {
    setIsRenderReady(false)
    setIsDeleteLoading(true)
    deleteUserExpense({
      variables: {
        id,
      },
    })
  }

  const formattedDate = dayjs(date).format('MMMM D, YYYY')
  const formattdCost = `$${(cost_in_cents / 100).toFixed(2)}`
  const categoryColor = color(category)
  return (
    <Card
      sx={{
        p: 0,
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
        }}
      >
        <Box sx={{ bgcolor: categoryColor, width: 6 }} />
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 0.5,
          }}
        >
          <CardHeader
            sx={{
              pb: 0,
              pt: 1.5,
              pl: 1.5,
              pr: 0,
              '& .MuiCardHeader-content': {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            }}
            title={formattdCost}
            subheader={formattedDate}
            slotProps={{
              title: {
                fontSize: '1rem',
              },
              subheader: {
                fontSize: '0.75rem',
              },
            }}
          />
          <Box sx={{ pb: 0, pt: 0, pl: 1.5, pr: 0 }}>
            <Typography variant="h5" sx={{ p: 0 }}>
              <Box component="span" fontWeight="bold">
                {category}
              </Box>
              {` - ${sub_category}`}
            </Typography>
          </Box>
          <Box sx={{ pb: 1.5, pt: 0, pl: 1.5, pr: 0 }}>
            <Typography variant="body2" sx={{ p: 0 }}>
              {note ? note : ''}
            </Typography>
          </Box>
        </Box>
      </Box>
      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          py: 0.825,
        }}
      >
        <IconButton
          onClick={handleDeleteExpense}
          sx={{ p: 0.625 }}
          aria-label="delete expense"
        >
          <DeleteIcon sx={{ fontSize: 20, color: 'error.main' }} />
        </IconButton>
        <IconButton
          onClick={onEdit}
          sx={{ p: 0.625 }}
          aria-label="edit expense"
        >
          <EditIcon sx={{ fontSize: 20, color: 'warning.main' }} />
        </IconButton>
      </CardActions>
      {(isDeleteLoading || isUpdateLoading) && (
        <LinearProgress
          sx={{
            position: 'absolute',
            width: '100%',
            bottom: 0,
            left: 0,
          }}
        />
      )}
    </Card>
  )
}
