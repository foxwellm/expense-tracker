import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const ErrorMessage = ({
  message = 'Unknown Error',
}: {
  message?: string
}) => (
  <Box
    sx={{
      height: '100%',
      padding: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'error.main',
    }}
  >
    <Typography variant="h6">Error loading data</Typography>
    <Typography variant="body2">{message}</Typography>
  </Box>
)
