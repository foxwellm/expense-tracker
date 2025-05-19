'use client'

import { Box } from '@mui/material'
import {
  axisBottom,
  axisLeft,
  max,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  select,
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

export function BarChart({
  monthlyExpenses,
  categories,
  monthYearDomain,
}: CombinedMonthlyExpenses) {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const svg = select(ref.current)

    const series = stack<MonthlyExpense>().keys(categories)(monthlyExpenses)

    const xScaleBandFn = scaleBand()
      .domain(monthYearDomain)
      .range([marginLeft, width - marginRight])
      .padding(0.04)

    const yScaleLinearFn = scaleLinear()
      .domain([0, max(series, (s) => max(s, (d) => d[1] / 100))!])
      .nice()
      .range([height - marginBottom, marginTop + legendHeight])

    // TODO: Refactor to use expenseCategoryColors mapping
    const color = scaleOrdinal<string>()
      .domain(categories)
      .range(Object.values(expenseCategoryColors))
      .unknown('#999')

    // LEGEND
    // TODO: Legend can be in useEffect that only rerenders with just categories
    // Can also be mapped over from categories

    const legendGroup = svg
      .append('g')
      .attr('class', 'legend')
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
        .attr('fill', 'currentColor')
    })

    // AXIS
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(axisBottom(xScaleBandFn).tickSizeOuter(0))
      .call((g) => g.selectAll('.domain').remove())
      .selectAll('text')
      .attr('font-size', `${axisFontSize}px`)

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(axisLeft(yScaleLinearFn).ticks(null, '$~s'))
      .call((g) => g.selectAll('.domain').remove())
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
      .attr('fill', (d) => color(d.key))

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
      svg.selectAll('.legend').remove()
    }
  }, [monthlyExpenses, categories, monthYearDomain])

  return (
    <Box>
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </Box>
  )
}
