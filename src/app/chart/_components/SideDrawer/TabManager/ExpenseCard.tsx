import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

export function ExpenseCard() {

  return (
    <Card sx={{ p: 0, display: 'flex', justifyContent: 'space-between' }}>
      <Box
        sx={{
          display: 'flex',
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
          title="Travel"
          subheader="September 14, 2016"
          slotProps={{
            root: {},
            title: {
              fontSize: '1rem',
            },
            subheader: {
              fontSize: '0.75rem',
            },
          }}
        />
        <Box sx={{ pb: 1.5, pt: 0, pl: 1.5, pr: 0 }}>
          <Typography variant="body2" sx={{ p: 0 }}>
            Digital Wireless Meat Thermometer
          </Typography>
        </Box>
      </Box>
      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 0.5,
          gap: 0.5,
        }}
      >
        <IconButton sx={{ p: 0.625 }} aria-label="delete expense">
          <HighlightOffIcon sx={{ fontSize: 20, color: 'error.main' }} />
        </IconButton>
      </CardActions>
    </Card>
  )
}
