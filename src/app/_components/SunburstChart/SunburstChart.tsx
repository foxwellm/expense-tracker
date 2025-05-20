'use client'

import { Box } from '@mui/material'
import {
  arc as d3Arc,
  format as d3Format,
  hierarchy,
  partition as d3Partition,
  select,
} from 'd3'
import { useEffect, useRef } from 'react'

interface SunburstNode {
  name: string
  value?: number
  children?: SunburstNode[]
}
import { expenseCategoryColors } from '@/lib/constants/expenses'
import { ExpenseCategory } from '@/types/expense'

import { data } from './data'

const radius = 928 / 2

function getTopLevelAncestorName(node: d3.HierarchyNode<SunburstNode>): string {
  while (node.depth > 1) {
    node = node.parent!
  }
  return node.data.name
}

const categoryColor = (category: ExpenseCategory) => {
  return expenseCategoryColors[category]
}

function getColor(node: d3.HierarchyNode<SunburstNode>): string {
  if (node.depth === 0) return '#fff' // root node
  const topLevel =
    node.depth === 1 ? node.data.name : getTopLevelAncestorName(node)
  // return '#3a3a3a'
  return categoryColor(topLevel as ExpenseCategory)
}

export function SunburstChart() {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!ref.current || !data) return
    const svg = select(ref.current)

    const root = d3Partition<SunburstNode>().size([2 * Math.PI, radius])(
      hierarchy(data as SunburstNode)
        .sum((d) => d.value ?? 0)
        .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
    )

    const arc = d3Arc<d3.HierarchyRectangularNode<SunburstNode>>()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1 - 1)

    const g = svg.append('g').attr('fill-opacity', 0.6)

    g.selectAll('path')
      .data(root.descendants().filter((d) => d.depth))
      .join('path')
      .attr('fill', (d) => getColor(d))
      .attr('d', arc)
      .append('title')
      .text(
        (d) =>
          `${d
            .ancestors()
            .reverse()
            .map((d) => d.data.name)
            .join('/')}\n${d3Format(',d')(d.value ?? 0)}`
      )

    // Printed Text
    const textGroup = svg
      .append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .attr('font-size', 10)
      .attr('font-family', 'sans-serif')

    textGroup
      .selectAll('text')
      .data(
        root
          .descendants()
          .filter((d) => d.depth && ((d.y0 + d.y1) / 2) * (d.x1 - d.x0) > 10)
      )
      .join('text')
      .attr('transform', (d) => {
        const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI
        const y = (d.y0 + d.y1) / 2
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
      })
      .attr('dy', '0.35em')
      .text((d) => d.data.name)

    const { x, y, width, height } = svg.node()!.getBBox()
    svg.attr('viewBox', [x, y, width, height].join(' '))
  }, [])

  return (
    <Box>
      <svg ref={ref} width={928} height={928} style={{ maxWidth: '100%' }} />
    </Box>
  )
}
