// NOTE: Removing an expenseCategory must be handled in the database by renaming the category or removing those rows
// Adding or Removing expenseCategory needs to be updated in GET_COMBINED_EXPENSES gql
export const expenseCategories = [
  'Apps',
  'Automotive',
  'Clothing',
  'Food',
  'Health',
  'Home',
  'Office',
  'Pets',
  'Tools',
  'Travel',
] as const

export const expenseCategoryColors = {
  Apps: '#e6194B',
  Automotive: '#f58231',
  Clothing: '#ffe119',
  Food: '#bfef45',
  Health: '#3cb44b',
  Home: '#42d4f4',
  Office: '#911eb4',
  Pets: '#f032e6',
  Tools: '#a9a9a9',
  Travel: '#4363d8',
}

export const expenseDisplayMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
