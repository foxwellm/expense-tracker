import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function NoExxpensesInfo() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '40%',
        left: '45%',
        transform: 'translate(-35%, -50%)',
        p: 2,
        border: '1px dashed',
        borderColor: (theme) => theme.palette.info.main,
        borderRadius: 2,
      }}
    >
      <Typography variant="body2" color="info">
        You have no Expenses in this date range. Add new Expenses, or change
        date range.
      </Typography>
    </Box>
  )
}
