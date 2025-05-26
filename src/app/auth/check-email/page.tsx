import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function CheckEmailRoot() {
  return (
    <Box
      sx={{
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '50%',
          p: 2,
          border: '1px dashed',
          borderColor: 'success.main',
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" color="success">
          Success - Check your email and click on the link to login.
        </Typography>
      </Box>
    </Box>
  )
}
