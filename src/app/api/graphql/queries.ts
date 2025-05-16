import { gql } from '@apollo/client'

export const GET_COMBINED_EXPENSES = gql`
  query GetCombinedExpenses {
    combinedMonthlyExpenses {
      monthlyExpenses {
        month
        Accessories
        Apps
        Audio
        Automotive
        Baby
        Bathroom
        Beauty
        Books
        Clothing
        Crafts
        Electronics
        Fitness
        Food
        Furniture
        Gaming
        Garden
        Health
        Home
        Kitchen
        Music
        Office
        Outdoor
        Pets
        Photography
        Safety
        Sports
        Storage
        Tools
        Toys
        Travel
      }
      categories
      monthYearDomain
    }
  }
`
