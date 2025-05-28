import { Expense } from '@/types/expense'

import { combineMonthlyExpenses, getMonthYearDomain } from './chartData'

describe('getMonthYearDomain', () => {
  it('should return array of `[Month (3 char display)] [2 digit year]` from start to end date', () => {
    const startDate = '2025-03-30'
    const endDate = '2025-06-30'

    const result = getMonthYearDomain(startDate, endDate)

    expect(result).toEqual(['Mar 25', 'Apr 25', 'May 25', 'Jun 25'])
  })
  it('should correctly handle traversing over a new year', () => {
    const startDate = '2024-10-31'
    const endDate = '2025-03-31'

    const result = getMonthYearDomain(startDate, endDate)

    expect(result).toEqual([
      'Oct 24',
      'Nov 24',
      'Dec 24',
      'Jan 25',
      'Feb 25',
      'Mar 25',
    ])
  })
  it('should not return more than 12 months', () => {
    const startDate = '2024-10-31'
    const endDate = '2025-12-31'

    const result = getMonthYearDomain(startDate, endDate)

    expect(result).toEqual([
      'Oct 24',
      'Nov 24',
      'Dec 24',
      'Jan 25',
      'Feb 25',
      'Mar 25',
      'Apr 25',
      'May 25',
      'Jun 25',
      'Jul 25',
      'Aug 25',
      'Sep 25',
    ])
  })
  it('should return undefined when startDate is after endDate', () => {
    const startDate1 = '2024-10-18'
    const endDate1 = '2024-10-15'

    const startDate2 = '2025-05-18'
    const endDate2 = '2024-10-15'

    const result1 = getMonthYearDomain(startDate1, endDate1)
    const result2 = getMonthYearDomain(startDate2, endDate2)

    expect(result1).toEqual(undefined)
    expect(result2).toEqual(undefined)
  })
  it('should return undefined when startDate or endDate is null', () => {
    const startDate = '2024-10-18'
    const endDate = '2025-02-15'

    const result1 = getMonthYearDomain(startDate, null)
    const result2 = getMonthYearDomain(null, endDate)

    expect(result1).toEqual(undefined)
    expect(result2).toEqual(undefined)
  })
  it('should return undefined when startDate or endDate is not a valid date', () => {
    const startDate = '2024-10-18'
    const endDate = '2025-02-15'

    const result1 = getMonthYearDomain(startDate, 'not-a-valid-date')
    const result2 = getMonthYearDomain('not-a-valid-date', endDate)

    expect(result1).toEqual(undefined)
    expect(result2).toEqual(undefined)
  })
})

describe('combineMonthlyExpenses', () => {
  it('should add together category costs during same months', () => {
    const mockExpenses = [
      {
        date: '2025-01-31',
        category: 'Fuel',
        cost_in_cents: 3245,
      },
      {
        date: '2025-01-06',
        category: 'Fuel',
        cost_in_cents: 5862,
      },
      {
        date: '2025-01-06',
        category: 'Food',
        cost_in_cents: 1796,
      },
      {
        date: '2024-12-30',
        category: 'Food',
        cost_in_cents: 1345,
      },
      {
        date: '2024-12-15',
        category: 'Fuel',
        cost_in_cents: 3311,
      },
      {
        date: '2024-12-15',
        category: 'Food',
        cost_in_cents: 1203,
      },
    ] as Expense[]

    const result = combineMonthlyExpenses(mockExpenses)

    const expectedResult = {
      monthlyExpenses: [
        { month: 'Jan 25', Fuel: 9107, Food: 1796 },
        { month: 'Dec 24', Food: 2548, Fuel: 3311 },
      ],
      categories: ['Food', 'Fuel'],
    }

    expect(result.categories).toEqual(expectedResult.categories)
    // Actual result monthlyExpenses will contain every possible category equal to 0
    expect(result.monthlyExpenses[0]).toMatchObject(
      expectedResult.monthlyExpenses[0]
    )
    expect(result.monthlyExpenses[1]).toMatchObject(
      expectedResult.monthlyExpenses[1]
    )
  })
  it('should fill in all categories for each month even if no costs', () => {
    const mockExpenses = [
      {
        date: '2025-01-31',
        category: 'Fuel',
        cost_in_cents: 3245,
      },
      {
        date: '2024-12-15',
        category: 'Fuel',
        cost_in_cents: 3311,
      },
      {
        date: '2024-12-15',
        category: 'Food',
        cost_in_cents: 1203,
      },
    ] as Expense[]

    const result = combineMonthlyExpenses(mockExpenses)

    const expectedResult = {
      monthlyExpenses: [
        // 'Food: 0' should populate
        { month: 'Jan 25', Fuel: 3245, Food: 0 },
        { month: 'Dec 24', Fuel: 3311, Food: 1203 },
      ],
      categories: ['Food', 'Fuel'],
    }

    expect(result.categories).toEqual(expectedResult.categories)
    // Actual result monthlyExpenses will contain every possible category equal to 0
    expect(result.monthlyExpenses[0]).toMatchObject(
      expectedResult.monthlyExpenses[0]
    )
    expect(result.monthlyExpenses[1]).toMatchObject(
      expectedResult.monthlyExpenses[1]
    )
  })
})
