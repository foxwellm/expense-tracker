'use client'

import {
  axisBottom,
  axisLeft,
  create,
  interpolateSpectral,
  max,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  stack,
} from 'd3'
// import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

import { expenseCategories } from '@/lib/constants/expenses'

type ExpenseCategory = (typeof expenseCategories)[number]

type MonthlyExpense = {
  month: string
} & Record<ExpenseCategory, number>

interface ExtendedSeriesPoint extends d3.SeriesPoint<MonthlyExpense> {
  key: string
}

function formatValue(x: number) {
  return isNaN(x) ? 'N/A' : `$${x.toFixed(2)}`
}

function generateSpectralColors(n: number): string[] {
  return Array.from({ length: n }, (_, i) =>
    interpolateSpectral(1 - i / (n - 1))
  )
}

export function VertBarChart({
  monthlyExpenses,
  categories,
  monthYearDomain,
}: {
  monthlyExpenses: MonthlyExpense[]
  categories: string[]
  monthYearDomain: string[]
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // TODO: resize on clientWidth change
    const width = ref.current?.clientWidth ?? 928
    const height = 500
    const marginTop = 10
    const marginRight = 0
    const marginBottom = 40
    const marginLeft = 50
    const legendHeight = 40

    const series = stack<MonthlyExpense>().keys(categories)(monthlyExpenses)

    const xScaleBandFunc = scaleBand()
      .domain(monthYearDomain)
      .range([marginLeft, width - marginRight])
      .padding(0.1)

    const yScaleLinearFunc = scaleLinear()
      .domain([0, max(series, (s) => max(s, (d) => d[1] / 100))!])
      .nice()
      .range([height - marginBottom, marginTop + legendHeight])

    const color = scaleOrdinal<string>()
      .domain(categories)
      .range(generateSpectralColors(series.length))
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

    // Calculate the number of legend items
    const numLegendItems = series.length

    // Dynamically calculate the spacing for each legend item
    const legendItemWidth = width / numLegendItems

    // Adjust for padding or margins if needed
    const padding = 10 // Example padding between items
    const adjustedLegendItemWidth = legendItemWidth - padding

    series.forEach((s, i) => {
      const legendRow = legendGroup
        .append('g')
        .attr('transform', `translate(${i * adjustedLegendItemWidth}, 0)`)

      legendRow
        .append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', color(s.key!))

      legendRow
        .append('text')
        .attr('x', 20)
        .attr('y', 12)
        .text(s.key!.charAt(0).toUpperCase() + s.key!.slice(1))
        .attr('font-size', '14px')
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
      .data((D) => D.map((d) => ({ ...d, key: D.key })))
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
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')

    // Y Axis
    svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(axisLeft(yScaleLinearFunc))
    // remove line around axis
    // .call((g) => g.selectAll(".domain").remove());

    if (ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(svg.node()!)
    }
  }, [monthlyExpenses, categories, monthYearDomain])

  return (
    <div
      ref={ref}
      style={{ width: '100%', fontFamily: 'Roboto, sans-serif' }}
    />
  )
}
