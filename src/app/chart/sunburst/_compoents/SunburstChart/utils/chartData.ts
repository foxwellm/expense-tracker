import { Expense } from '@/types/expense'

import { SunburstNode } from '../../../_types'

export function sunburstNode(expenses: Expense[]): SunburstNode {
  const root: SunburstNode = {
    name: 'Expenses',
    children: [],
  }

  for (const expense of expenses) {
    let categoryNode = root.children.find(
      (child) => child.name === expense.category
    )

    if (!categoryNode) {
      categoryNode = { name: expense.category, value: 0, children: [] }
      root.children.push(categoryNode)
    }

    let subCategoryNode = categoryNode.children.find(
      (child) => child.name === expense.sub_category
    )

    if (!subCategoryNode) {
      subCategoryNode = {
        name: expense.sub_category,
        value: expense.cost_in_cents,
        children: [],
      }
      categoryNode.children.push(subCategoryNode)
    } else {
      subCategoryNode.value = subCategoryNode.value + expense.cost_in_cents
    }
  }

  return root
}
