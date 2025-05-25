import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

export function ExpenseCard() {
  return (
    <Card>
      <CardHeader
        action={
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <IconButton size="small" aria-label="edit">
                <EditIcon sx={{ color: 'yellow', fontSize: 20 }} />
              </IconButton>
              <IconButton size="small" aria-label="delte">
                <DeleteForeverIcon sx={{ color: 'error.main', fontSize: 20 }} />
              </IconButton>
            </Box>
          </>
        }
        title={
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" component="div">
              Clothing
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: 'text.secondary' }}
            >
              12/05/25
            </Typography>
            <Box></Box>
          </Box>
        }
        subheader="September 14, 2016 jdsafjasbdf sdf asdf kjasd fjas dfkj asdjkf asd f asd"
        slotProps={{
          subheader: {
            variant: 'h6',
          },
        }}
      />
    </Card>
  )
}
