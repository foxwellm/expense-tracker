import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

export function TabPanel({
  children,
  header,
}: {
  children: ReactNode
  header?: ReactNode
}) {
  return (
    <>
      {header && (
        <>
          <Box py={1.5} display={'flex'} justifyContent="center">
            <Typography variant="mediumHeader">{header}</Typography>
          </Box>
          <Divider />
        </>
      )}

      <Box
        role="tabpanel"
        sx={{
          overflowY: 'auto',
        }}
      >
        <Box sx={{ p: 2 }}>{children}</Box>
      </Box>
    </>
  )
}
