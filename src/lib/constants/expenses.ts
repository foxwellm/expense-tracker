// NOTE: Removing an expenseCategory must be handled in the database by renaming the category or removing those rows
// Adding or Removing expenseCategory needs to be updated in GET_USER_EXPENSES gql
export const expenseCategories = [
  'Car',
  'Clothing',
  'Food',
  'Health',
  'Home',
  'Office',
  'Pets',
  'Tools',
  'Toys',
  'Travel',
] as const

export const expenseCategoryColors = {
  Car: '#f58231',
  Clothing: '#ffe119',
  Food: '#bfef45',
  Health: '#3cb44b',
  Home: '#42d4f4',
  Office: '#4363d8',
  Pets: '#911eb4',
  Tools: '#f032e6',
  Toys: '#e6194B',
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
