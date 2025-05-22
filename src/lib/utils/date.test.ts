import dayjs from 'dayjs'

import { expenseDisplayMonths } from '../constants/expenses'
import { getMonthYear } from './date'

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
