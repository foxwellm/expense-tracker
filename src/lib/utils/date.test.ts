import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import { expenseDisplayMonths } from '../constants/expenses'
import { getMonthYear, getRandomDateBetween } from './date'
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

describe('getRandomDateBetween', () => {
  it('should return a random date between 2 dates', () => {
    const startDate = '2025-06-01'
    const endDate = '2025-07-30'

    const result = getRandomDateBetween(startDate, endDate)
    const testAfterStartDate = dayjs(result).isSameOrAfter(dayjs(startDate))
    const testBeforeEndDate = dayjs(result).isSameOrBefore(dayjs(endDate))

    expect(testAfterStartDate).toEqual(true)
    expect(testBeforeEndDate).toEqual(true)
  })
  it('should return a random date when traversing over a new year', () => {
    const startDate = '2024-12-15'
    const endDate = '2025-01-15'

    const result = getRandomDateBetween(startDate, endDate)
    const testAfterStartDate = dayjs(result).isSameOrAfter(dayjs(startDate))
    const testBeforeEndDate = dayjs(result).isSameOrBefore(dayjs(endDate))

    expect(testAfterStartDate).toEqual(true)
    expect(testBeforeEndDate).toEqual(true)
  })
})

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
