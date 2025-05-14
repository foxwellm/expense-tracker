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
