import { gql } from '@apollo/client'

export const GET_COMBINED_EXPENSES = gql`
  query GetCombinedExpenses {
    combinedMonthlyExpenses {
      monthlyExpenses {
        month
        Clothing
        Food
        Fuel
        Entertainment
      }
      categories
      monthYearDomain
    }
  }
`
