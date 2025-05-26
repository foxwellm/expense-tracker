import { Box, Button, Typography } from '@mui/material'

import { LogInForm, SignupForm } from './_components'
import { anonymousSignup, login, signup } from './actions'

export default function LoginPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        gap: 4,
        px: 4,
      }}
    >
      <SignupForm onSignup={signup} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          gap: 2,
          width: 280,
          mt: 4,
          py: 3,
          px: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center">
          Log in Anonymously
        </Typography>
        <Typography variant="subtitle2" color="info">
          *** If you do not feel comfortable using your credentials, you can log
          in anonymously to view and test the application. However, once you
          close the browser you will not be able to log back in and therefore
          lose your data. ***
        </Typography>
        <Button onClick={anonymousSignup} variant="contained" color="secondary">
          Log in anonymously
        </Button>
      </Box>
      <LogInForm onLogIn={login} />
    </Box>
  )
}
