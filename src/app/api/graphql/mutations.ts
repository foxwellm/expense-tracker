import { gql } from '@apollo/client'

export const ADD_EXPENSES = gql`
  mutation AddExpenses($expenses: [ExpenseInput!]!) {
    addExpenses(expenses: $expenses) {
      date
      category
      cost_in_cents
    }
  }
`

export const DELETE_USER_EXPENSES = gql`
  mutation DELETE_USER_EXPENSES {
    deleteUserExpenses
  }
`
