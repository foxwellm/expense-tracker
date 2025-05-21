interface SunburstNode {
  name: string
  value?: number
  children?: SunburstNode[]
}

// TODO: Use shared Expense once sub_category implemented
interface Expense {
  date: string
  category: string
  sub_category: string
  cost_in_cents: number
}

export function sunburstNode(expenses: Expense[]): SunburstNode {
  const root: SunburstNode = {
    name: 'Expenses',
    children: [],
  }

  const categoryMap = new Map<string, SunburstNode>()

  for (const expense of expenses) {
    let categoryNode = categoryMap.get(expense.category)
    if (!categoryNode) {
      categoryNode = { name: expense.category, children: [] }
      categoryMap.set(expense.category, categoryNode)
      root.children!.push(categoryNode)
    }

    let subCategoryNode = categoryNode.children!.find(
      (child) => child.name === expense.sub_category
    )

    if (!subCategoryNode) {
      subCategoryNode = {
        name: expense.sub_category,
        value: expense.cost_in_cents,
      }
      categoryNode.children!.push(subCategoryNode)
    } else {
      subCategoryNode.value =
        (subCategoryNode.value || 0) + expense.cost_in_cents
    }
  }

  return root
}
