import { expenseCategories, expenseCategoryColors } from './expenses'

describe('expenseCategories and expenseCategoryColors', () => {
  it('should match length and key values', () => {
    expect(expenseCategories).toEqual(Object.keys(expenseCategoryColors))
  })
})
