'use client'

import { useEffect, useState } from 'react'

import { VertBarChart } from './VertBarChart'

export function VertBarChartContainer() {
  const [combinedExpenses, setCombinedExpenses] = useState()
  useEffect(() => {
    const getMonthlyExpenses = async () => {
      const res = await fetch('/api/expenses')
      const { combinedMonthyExpenses } = await res.json()
      setCombinedExpenses(combinedMonthyExpenses)
    }
    getMonthlyExpenses()
  }, [])

  if (!combinedExpenses) {
    return <></>
  }

  const { monthlyExpenses, categories, monthYearDomain } = combinedExpenses
  return (
    <>
      {combinedExpenses && (
        <VertBarChart
          monthlyExpenses={monthlyExpenses}
          categories={categories}
          // TODO: Build function to construct domain from data
          monthYearDomain={monthYearDomain}
        />
      )}
    </>
  )
}
