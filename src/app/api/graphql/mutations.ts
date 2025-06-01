import { gql } from '@apollo/client'

export const ADD_EXPENSES = gql`
  mutation AddExpenses($expenses: [CreateExpenseInput!]!) {
    addExpenses(expenses: $expenses) {
      id
      date
      category
      sub_category
      cost_in_cents
      note
    }
  }
`

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($expenseId: String!, $expense: CreateExpenseInput!) {
    updateExpense(expenseId: $expenseId, expense: $expense)
  }
`

export const DELETE_USER_EXPENSES = gql`
  mutation DELETE_USER_EXPENSES {
    deleteUserExpenses
  }
`

export const DELETE_USER_EXPENSE = gql`
  mutation DELETE_USER_EXPENSE($id: ID!) {
    deleteUserExpense(id: $id)
  }
`
