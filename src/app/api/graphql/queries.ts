import { gql } from '@apollo/client'

export const GET_COMBINED_EXPENSES = gql`
  query GetCombinedExpenses($startDate: String!, $endDate: String!) {
    combinedMonthlyExpenses(startDate: $startDate, endDate: $endDate) {
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
