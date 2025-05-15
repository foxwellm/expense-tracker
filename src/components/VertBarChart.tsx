'use client'

import { Box } from '@mui/material'
import {
  axisBottom,
  axisLeft,
  create,
  max,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  stack,
} from 'd3'
import { useEffect, useRef } from 'react'

import { expenseCategoryColors } from '@/lib/constants/expenses'
import { CombinedMonthlyExpenses, MonthlyExpense } from '@/types/expense'

interface ExtendedSeriesPoint extends d3.SeriesPoint<MonthlyExpense> {
  key: string
}

function formatValue(x: number) {
  return isNaN(x) ? 'N/A' : `$${x.toFixed(2)}`
}

const width = 1800
const height = 1000
const marginTop = 20
const marginBottom = 80
const marginRight = 0
const marginLeft = 120
const legendHeight = 80
const legendRowBox = 30
const legendRowTextBoxHeight = 24
const legendRowTextBoxWidth = 40
const legendFontSize = 28
const axisFontSize = 20

export function VertBarChart({
  monthlyExpenses,
  categories,
  monthYearDomain,
}: CombinedMonthlyExpenses) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const series = stack<MonthlyExpense>().keys(categories)(monthlyExpenses)

    const xScaleBandFunc = scaleBand()
      .domain(monthYearDomain)
      .range([marginLeft, width - marginRight])
      .padding(0.04)

    const yScaleLinearFunc = scaleLinear()
      .domain([0, max(series, (s) => max(s, (d) => d[1] / 100))!])
      .nice()
      .range([height - marginBottom, marginTop + legendHeight])

    const color = scaleOrdinal<string>()
      .domain(categories)
      .range(Object.values(expenseCategoryColors))
      .unknown('#999')

    const svg = create('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto; font-siz: 14px;')

    // LEGEND
    const legendGroup = svg
      // "g" group (container for grouping related items)
      .append('g')
      .attr('transform', `translate(${marginLeft}, 10)`)

    const numLegendItems = series.length
    const legendItemWidth = width / numLegendItems
    const padding = 10
    const adjustedLegendItemWidth = legendItemWidth - padding

    series.forEach((s, i) => {
      const legendRow = legendGroup
        .append('g')
        .attr('transform', `translate(${i * adjustedLegendItemWidth}, 0)`)

      legendRow
        .append('rect')
        .attr('width', legendRowBox)
        .attr('height', legendRowBox)
        .attr('fill', color(s.key!))

      legendRow
        .append('text')
        .attr('x', legendRowTextBoxWidth)
        .attr('y', legendRowTextBoxHeight)
        .text(s.key)
        .attr('font-size', `${legendFontSize}px`)
        // currentColor inherits from parent context
        .attr('fill', 'currentColor')
    })

    // Draw bars
    svg
      .append('g')
      .selectAll('g')
      .data(series)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .selectAll<SVGRectElement, ExtendedSeriesPoint>('rect')
      .data((D) =>
        D.map((d) => {
          return { ...d, key: D.key }
        })
      )
      .join('rect')
      .attr('x', (d) => xScaleBandFunc(d.data.month)!)
      .attr('y', (d) => yScaleLinearFunc(d[1] / 100))
      .attr('height', (d) => {
        return yScaleLinearFunc(d[0] / 100) - yScaleLinearFunc(d[1] / 100)
      })
      .attr('width', xScaleBandFunc.bandwidth())
      .append('title')
      .text((d) => {
        return `${d.data.month}\n${d.key}\n${formatValue(d[1] / 100 - d[0] / 100)}`
      })

    // X Axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(axisBottom(xScaleBandFunc))
      // remove line around axis
      .call((g) => g.selectAll('.domain').remove())
      .selectAll('text')
      .attr('font-size', `${axisFontSize}px`)

    // Y Axis
    svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(axisLeft(yScaleLinearFunc))
      // remove line around axis
      .call((g) => g.selectAll('.domain').remove())
      .selectAll('text')
      .attr('font-size', `${axisFontSize}px`)

    if (ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(svg.node()!)
    }
  }, [monthlyExpenses, categories, monthYearDomain])

  return <Box ref={ref} />
}
