import { gql } from '@apollo/client'

export const GET_USER_EXPENSES = gql`
  query GetUserExpenses($startDate: String!, $endDate: String!) {
    userExpenses(startDate: $startDate, endDate: $endDate) {
      date
      category
      sub_category
      cost_in_cents
      note
    }
  }
`
