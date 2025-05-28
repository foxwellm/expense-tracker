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
import { DeleteExpenses } from './DeleteExpenses'

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

export function TabManager() {
  const [value, setValue] = useState(1)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="expenses tabs"
          // NOTE: Needed fo mobile simulator
          // sx={{
          //   '& .MuiTabs-indicator': {
          //     backgroundColor: 'transparent',
          //   },
          // }}
        >
          <Tab icon={<ReceiptIcon />} {...a11yProps(0)} />
          <Tab icon={<ReceiptLongIcon />} {...a11yProps(1)} />
          <Tab icon={<DeleteSweepIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AddExpenseForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddExpensesForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DeleteExpenses />
      </TabPanel>
    </>
  )
}
