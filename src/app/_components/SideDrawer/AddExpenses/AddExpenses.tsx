'use client'

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import ReceiptIcon from '@mui/icons-material/Receipt'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { SyntheticEvent, useState } from 'react'

import { AddExpenseForm } from './AddExpenseForm'
import { AddExpensesForm } from './AddExpensesForm'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

export function AddExpenses() {
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary" // TODO: change for light
          textColor="inherit"
          variant="fullWidth"
          aria-label="expenses tabs"
        >
          <Tab icon={<ReceiptIcon />} sx={{ minWidth: 0 }} {...a11yProps(0)} />
          <Tab
            icon={<ReceiptLongIcon />}
            sx={{ minWidth: 0 }}
            {...a11yProps(1)}
          />
          <Tab
            icon={<DeleteSweepIcon />}
            sx={{ minWidth: 0 }}
            {...a11yProps(2)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AddExpenseForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddExpensesForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* TODO: Delete Expenses */}
      </TabPanel>
    </Box>
  )
}
