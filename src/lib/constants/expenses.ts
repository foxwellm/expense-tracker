// NOTE: Removing an expenseCategory must be handled in the database by renaming the category or removing those rows
// Adding or Removing expenseCategory needs to be updated in GET_COMBINED_EXPENSES gql
export const expenseCategories = [
  'Apps',
  'Car',
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
  Car: '#f58231',
  Clothing: '#ffe119',
  Food: '#bfef45',
  Health: '#3cb44b',
  Home: '#42d4f4',
  Office: '#4363d8',
  Pets: '#911eb4',
  Tools: '#f032e6',
  Travel: '#a9a9a9',
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
