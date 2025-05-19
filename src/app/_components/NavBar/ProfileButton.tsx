'use client'

import NoAccountsIcon from '@mui/icons-material/NoAccounts'
import PersonIcon from '@mui/icons-material/Person'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { User } from '@supabase/supabase-js'
import { useState } from 'react'

import { logout } from '@/app/login/actions'

const options = ['Logout'] as const
type MenuOptions = (typeof options)[number]

export function ProfileButton({ user }: { user: User | null }) {
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

  return (
    <>
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
    </>
  )
}
