'use client'

import NoAccountsIcon from '@mui/icons-material/NoAccounts'
import PersonIcon from '@mui/icons-material/Person'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { logout } from '@/app/login/actions'
import { PaletteModeSwitch } from '@/components'
import { getAuthUser } from '@/lib/supabase/auth'

const options = ['Logout'] as const
type MenuOptions = (typeof options)[number]

export function NavBar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    option: MenuOptions
  ) => {
    if (option === 'Logout') {
      logout()
    }
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const getUser = async () => {
      const authUser = await getAuthUser()
      setUser(authUser)
    }

    getUser()
  }, [])

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ marginX: 4 }}>
        <Button
          disableRipple
          onClick={() => router.push('/')}
          sx={{
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'inherit',
            },
          }}
        >
          <Image src="/FETIcon.png" alt="FETIcon" width={28} height={28} />
        </Button>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Foxwell Expense Tracker
        </Typography>
        <PaletteModeSwitch />
        <IconButton
          disabled={!user}
          onClick={handleClickListItem}
          aria-label={user ? 'logout' : 'log in'}
          sx={{ visibility: user ? 'visible' : 'hidden' }}
        >
          {user?.is_anonymous ? <NoAccountsIcon /> : <PersonIcon />}
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'profile-button',
              role: 'listbox',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              dense
              key={option}
              onClick={(event) => handleMenuItemClick(event, option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
