import { gql } from '@apollo/client'

export const GET_COMBINED_EXPENSES = gql`
  query GetCombinedExpenses {
    combinedMonthlyExpenses {
      monthlyExpenses {
        month
        Apps
        Car
        Clothing
        Food
        Health
        Home
        Office
        Pets
        Tools
        Travel
      }
      categories
      monthYearDomain
    }
  }
`
