'use client'

import Box from '@mui/material/Box'
import {
  axisBottom,
  axisLeft,
  max,
  scaleBand,
  scaleLinear,
  select,
  stack,
} from 'd3'
import { useEffect, useRef } from 'react'

import { expenseCategoryColors } from '@/lib/constants/expenses'
import {
  CombinedMonthlyExpenses,
  ExpenseCategory,
  MonthlyExpense,
} from '@/types/expense'

interface ExtendedSeriesPoint extends d3.SeriesPoint<MonthlyExpense> {
  key: string
}

function formatValue(x: number) {
  return isNaN(x) ? 'N/A' : `$${x.toFixed(2)}`
}

const color = (category: ExpenseCategory) => {
  return expenseCategoryColors[category]
}

const marginTop = 20
const marginBottom = 30
const marginRight = 0
const marginLeft = 120
const legendHeight = 80
const legendRowBox = 30
const legendRowTextBoxHeight = 24
const legendRowTextBoxWidth = 40
const legendFontSize = 28
const axisFontSize = 24

export function BarChart({
  monthlyExpenses,
  categories,
  monthYearDomain,
  chartWidth,
  chartHeight,
}: CombinedMonthlyExpenses & {
  monthYearDomain: string[]
  chartWidth: number
  chartHeight: number
}) {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const svg = select(ref.current)

    const legendGroup = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${marginLeft}, 10)`)

    const numLegendItems = categories.length
    const legendItemWidth = chartWidth / numLegendItems
    const padding = 10
    const adjustedLegendItemWidth = legendItemWidth - padding

    categories.forEach((category, i) => {
      const legendRow = legendGroup
        .append('g')
        .attr('transform', `translate(${i * adjustedLegendItemWidth}, 0)`)

      legendRow
        .append('rect')
        .attr('width', legendRowBox)
        .attr('height', legendRowBox)
        .attr('fill', color(category))

      legendRow
        .append('text')
        .attr('x', legendRowTextBoxWidth)
        .attr('y', legendRowTextBoxHeight)
        .text(category)
        .attr('font-size', `${legendFontSize}px`)
        .attr('fill', 'currentColor')
    })
    return () => {
      svg.selectAll('.legend').remove()
    }
  }, [categories, chartWidth])

  useEffect(() => {
    if (!ref.current) return
    const svg = select(ref.current)

    const series = stack<MonthlyExpense>().keys(categories)(monthlyExpenses)

    const xScaleBandFn = scaleBand()
      .domain(monthYearDomain)
      .range([marginLeft, chartWidth - marginRight])
      .padding(0.04)

    const yScaleLinearFn = scaleLinear()
      .domain([0, max(series, (s) => max(s, (d) => d[1] / 100))!])
      .nice()
      .range([chartHeight - marginBottom, marginTop + legendHeight])

    // AXIS
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${chartHeight - marginBottom})`)
      .call(axisBottom(xScaleBandFn).tickSizeOuter(0))
      .call((g) => monthlyExpenses.length && g.selectAll('.domain').remove())
      .selectAll('text')
      .attr('font-size', `${axisFontSize}px`)

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(axisLeft(yScaleLinearFn).ticks(null, '$~s'))
      .call((g) => monthlyExpenses.length && g.selectAll('.domain').remove())
      .selectAll('text')
      .attr('font-size', `${axisFontSize}px`)

    // BARS
    const barGroups = svg
      .selectAll<SVGGElement, d3.Series<MonthlyExpense, string>>('g.layer')
      .data(series, (d) => d.key)

    const barGroupsEnter = barGroups
      .enter()
      .append('g')
      .attr('class', 'layer')
      .attr('fill', (d) => color(d.key as ExpenseCategory))

    const barGroupsMerge = barGroupsEnter.merge(barGroups)

    barGroupsMerge.each(function (d) {
      const group = select(this)
      const rects = group
        .selectAll<SVGRectElement, ExtendedSeriesPoint>('rect')
        .data(
          d.map((p) => ({ ...p, key: d.key })),
          (d) => `${d.key}-${d.data.month}`
        )

      rects.join(
        (enter) =>
          enter
            .append('rect')
            .attr('x', (d) => xScaleBandFn(d.data.month)!)
            .attr('y', yScaleLinearFn(0))
            .attr('width', xScaleBandFn.bandwidth())
            .attr('height', 0)
            .call((enter) =>
              enter
                .transition()
                .duration(600)
                .attr('y', (d) => yScaleLinearFn(d[1] / 100))
                .attr(
                  'height',
                  (d) => yScaleLinearFn(d[0] / 100) - yScaleLinearFn(d[1] / 100)
                )
            )
            .append('title')
            .text(
              (d) =>
                `${d.data.month}\n${d.key}\n${formatValue(d[1] / 100 - d[0] / 100)}`
            ),
        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(600)
              .attr('x', (d) => xScaleBandFn(d.data.month)!)
              .attr('y', (d) => yScaleLinearFn(d[1] / 100))
              .attr(
                'height',
                (d) => yScaleLinearFn(d[0] / 100) - yScaleLinearFn(d[1] / 100)
              )
              .attr('width', xScaleBandFn.bandwidth())
              .select('title')
              .text(
                (d) =>
                  `${d.data.month}\n${d.key}\n${formatValue(d[1] / 100 - d[0] / 100)}`
              )
          ),
        (exit) =>
          exit.call((exit) =>
            exit
              .transition()
              .duration(600)
              .attr('y', yScaleLinearFn(0))
              .attr('height', 0)
              .remove()
          )
      )
    })

    barGroups.exit().remove()

    return () => {
      svg.selectAll('.x-axis').remove()
      svg.selectAll('.y-axis').remove()
    }
  }, [monthlyExpenses, categories, monthYearDomain, chartWidth, chartHeight])

  return (
    <Box>
      <svg
        ref={ref}
        width={chartWidth}
        height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </Box>
  )
}
