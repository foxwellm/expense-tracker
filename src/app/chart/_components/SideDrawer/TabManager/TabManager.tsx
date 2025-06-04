'use client'

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import EditNoteIcon from '@mui/icons-material/EditNote'
import ReceiptIcon from '@mui/icons-material/Receipt'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AppBar from '@mui/material/AppBar'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { SyntheticEvent, useState } from 'react'

import { AddExpenseForm } from './AddExpenseForm'
import { AddExpensesForm } from './AddExpensesForm'
import { DeleteAllExpenses } from './DeleteAllExpenses'
import { EditExpenses } from './EditExpenses'
import { TabPanel } from './TabPanel'

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
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="expenses tabs"
          // NOTE: Needed for chrome ext mobile simulator
          // sx={{
          //   '& .MuiTabs-indicator': {
          //     backgroundColor: 'transparent',
          //   },
          // }}
        >
          <Tab
            sx={{ minWidth: 0, px: 0 }}
            icon={<ReceiptIcon />}
            aria-label="add expense"
          />
          <Tab
            sx={{ minWidth: 0, px: 0 }}
            icon={<ReceiptLongIcon />}
            aria-label="add random expenses"
          />
          <Tab
            sx={{ minWidth: 0, px: 0 }}
            icon={<EditNoteIcon />}
            aria-label="edit expenses"
          />
          <Tab
            sx={{ minWidth: 0, px: 0 }}
            icon={<DeleteSweepIcon />}
            aria-label="delete all expenses"
          />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabPanel header="Add Expense">
          <AddExpenseForm />
        </TabPanel>
      )}
      {value === 1 && (
        <TabPanel header="Add Random Expenses">
          <AddExpensesForm />
        </TabPanel>
      )}
      {value === 2 && (
        <TabPanel header="Edit Expenses">
          <EditExpenses />
        </TabPanel>
      )}
      {value === 3 && (
        <TabPanel>
          <DeleteAllExpenses />
        </TabPanel>
      )}
    </>
  )
}
