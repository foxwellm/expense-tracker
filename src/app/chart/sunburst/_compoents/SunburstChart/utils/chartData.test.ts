import { sunburstNode } from './chartData'

describe('sunburstNode', () => {
  it('should combine cost of same category/subcategory', () => {
    const expenses = [
      {
        id: '1',
        date: '',
        category: 'Toys' as const,
        sub_category: '1',
        cost_in_cents: 2,
      },
      {
        id: '2',
        date: '',
        category: 'Toys' as const,
        sub_category: '1',
        cost_in_cents: 3,
      },
    ]

    const result = sunburstNode(expenses)
    expect(result.children![0].children![0].value).toEqual(5)
  })
})
