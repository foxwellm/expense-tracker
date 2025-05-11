'use client'

import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

const formatValue = (x: number) => (isNaN(x) ? 'N/A' : x.toLocaleString('en'))

function generateSpectralColors(n: number): string[] {
  return Array.from({ length: n }, (_, i) =>
    d3.interpolateSpectral(1 - i / (n - 1))
  )
}

export function VertBarChart({
  reshaped,
  categories,
}: {
  reshaped: Record<string, number | string>[]
  categories: string[]
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const width = ref.current?.clientWidth ?? 928
    const height = 500
    const marginTop = 10
    const marginRight = 0
    const marginBottom = 40
    const marginLeft = 50
    const legendHeight = 40

    const series = d3.stack<Record<string, number | string>>().keys(categories)(
      reshaped as Record<string, number | string>[]
    )

    const xScaleBandFunc = d3
      .scaleBand()
      // TODO: Build function to construct domain from data
      .domain(['Dec 24', 'Jan 25', 'Feb 25', 'Mar 25'])
      .range([marginLeft, width - marginRight])
      .padding(0.1)

    const yScaleLinearFunc = d3
      .scaleLinear()
      .domain([0, d3.max(series, (s) => d3.max(s, (d) => d[1]))!])
      .nice()
      .range([height - marginBottom, marginTop + legendHeight])

    const color = d3
      .scaleOrdinal<string>()
      .domain(categories)
      .range(generateSpectralColors(series.length))
      .unknown('#ccc')

    const svg = d3
      .create('svg')
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
      .attr('fill', (d) => color(d.key!))
      .selectAll('rect')
      .data((D) => D.map((d) => (Object.assign(d, { key: D.key }), d)))
      .join('rect')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr('x', (d) => xScaleBandFunc((d.data as any).month)!)
      .attr('y', (d) => yScaleLinearFunc(d[1]))
      .attr('height', (d) => yScaleLinearFunc(d[0]) - yScaleLinearFunc(d[1]))
      .attr('width', xScaleBandFunc.bandwidth())
      .append('title')
      .text(
        (d) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          `${(d.data as any).month} ${(d as any).key}\n${formatValue(
            d[1] - d[0]
          )}`
      )

    // X Axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(xScaleBandFunc))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end')

    // Y Axis
    svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(yScaleLinearFunc))
    // remove line around axis
    // .call((g) => g.selectAll(".domain").remove());

    if (ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(svg.node()!)
    }
  }, [reshaped, categories])

  return (
    <div
      ref={ref}
      style={{ width: '100%', fontFamily: 'Roboto, sans-serif' }}
    />
  )
}
