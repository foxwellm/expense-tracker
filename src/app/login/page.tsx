import { Box, Button, TextField, Typography } from '@mui/material'

import { anonymousSignup, login, signup } from './actions'

export default function LoginPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 300,
          mx: 'auto',
          mt: 4,
          p: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center">
          Log in/Sign up
        </Typography>

        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          required
          fullWidth
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          required
          fullWidth
        />

        <Button
          type="submit"
          formAction={login}
          variant="contained"
          color="primary"
        >
          Log in
        </Button>

        <Button
          type="submit"
          formAction={signup}
          variant="outlined"
          color="secondary"
        >
          Sign up
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // gap: 2,
          justifyContent: 'space-between',
          width: 300,
          mx: 'auto',
          mt: 4,
          p: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center">
          Log in Anonymously
        </Typography>
        <Typography variant="subtitle2" color="info">
          *** If you do not feel comfortable using your credentials, you can log
          in anonymously to view and test the application. However, once you
          close the browser you will not be able to log back in and lose your
          data. ***
        </Typography>
        <Button onClick={anonymousSignup} variant="contained" color="secondary">
          Log in anonymously
        </Button>
      </Box>
    </Box>
  )
}
