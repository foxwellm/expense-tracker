import { gql } from '@apollo/client'

export const GET_COMBINED_EXPENSES = gql`
  query GetCombinedExpenses($startDate: String!, $endDate: String!) {
    combinedMonthlyExpenses(startDate: $startDate, endDate: $endDate) {
      monthlyExpenses {
        month
        Car
        Clothing
        Food
        Health
        Home
        Office
        Pets
        Tools
        Toys
        Travel
      }
      categories
      monthYearDomain
    }
  }
`
