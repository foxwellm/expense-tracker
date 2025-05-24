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

import { expenseCategoryColors } from '@/lib/constants/expenses'
import { ExpenseCategory } from '@/types/expense'

import { SunburstNode } from '../../_types'

const radius = 330

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
  return categoryColor(topLevel as ExpenseCategory)
}

export function SunburstChart({
  sunburstNode,
  chartWidth,
  chartHeight,
}: {
  sunburstNode: SunburstNode
  chartWidth: number
  chartHeight: number
}) {
  const ref = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!ref.current || !sunburstNode) return
    const svg = select(ref.current)

    const root = d3Partition<SunburstNode>().size([2 * Math.PI, radius])(
      hierarchy(sunburstNode)
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

    svg
      .append('g')
      .selectAll('path')
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
            .slice(1)
            .map((d) => d.data.name)
            .join(' > ')}\n${d3Format('$.2f')(d.value ? d.value / 100 : 0)}`
      )

    // Printed Text
    svg
      .append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
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
      .attr('font-size', (d) => {
        if (expenseCategoryColors[d.data.name as ExpenseCategory]) return 16
        if (d.data.name.length > 25) return 7
        return 8
      })

    const { x, y, width, height } = svg.node()!.getBBox()
    svg.attr('viewBox', [x, y, width, height].join(' '))

    return () => {
      svg.selectAll('text').remove()
      svg.selectAll('*').remove()
    }
  }, [sunburstNode])

  return (
    <Box>
      <svg
        ref={ref}
        width={chartWidth}
        height={chartHeight}
        style={{ maxWidth: '100%', height: '100%' }}
      />
    </Box>
  )
}
