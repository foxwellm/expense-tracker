import dayjs from 'dayjs'

import { expenseDisplayMonths } from '@/lib/constants/expenses'
import { Expense } from '@/types/expense'

import {
  combineMonthlyExpenses,
  getMonthYear,
  getMonthYearDomain,
} from './utils'

describe('getMonthYear', () => {
  it('should return `[Month (3 char display)] [2 digit year]` when given yyyy-mm-dd string or Date object', () => {
    const dateString = '2025-06-30'
    const dateObj = dayjs('2025-06-30')

    const expectedResult = 'Jun 25'
    // 0 === January
    const expectedFuncResult = `${expenseDisplayMonths[5]} 25`

    const actualStringResult = getMonthYear(dateString)
    const actualDateObjResult = getMonthYear(dateObj)

    expect(actualStringResult).toEqual(expectedResult)
    expect(actualStringResult).toEqual(expectedFuncResult)
    expect(actualDateObjResult).toEqual(expectedResult)
    expect(actualDateObjResult).toEqual(expectedFuncResult)
  })
})

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
      monthYearDomain: ['Dec 24', 'Jan 25'],
    }

    expect(result.categories).toEqual(expectedResult.categories)
    expect(result.monthYearDomain).toEqual(expectedResult.monthYearDomain)
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
      monthYearDomain: ['Dec 24', 'Jan 25'],
    }

    expect(result.categories).toEqual(expectedResult.categories)
    expect(result.monthYearDomain).toEqual(expectedResult.monthYearDomain)
    // Actual result monthlyExpenses will contain every possible category equal to 0
    expect(result.monthlyExpenses[0]).toMatchObject(
      expectedResult.monthlyExpenses[0]
    )
    expect(result.monthlyExpenses[1]).toMatchObject(
      expectedResult.monthlyExpenses[1]
    )
  })
})
