import data from '../lib/constants/data.json'
import { VertBarChart } from './VertBarChart'

interface PopulationData {
  state: string
  age: string
  population: number
}

export function VertBarChartContainer() {
  // const stackedKeys: string[] = []; // 10-19, 20-29

  // [{state: 'AL', 10-19: 123456}]
  // const groupedData: Record<string, number | string>[] = [];

  const stackedKeys: string[] = []

  const mappedData: Record<string, number | string>[] = []

  const ageSet = new Set<string>()
  const groupedByState = new Map<string, Record<string, number>>()

  ;(data as PopulationData[]).forEach(({ state, age, population }) => {
    ageSet.add(age)
    if (!groupedByState.has(state)) {
      groupedByState.set(state, {})
    }
    // Currently data population comes as unique
    groupedByState.get(state)![age] = population
  })

  stackedKeys.push(...Array.from(ageSet))

  groupedByState.forEach((ageMap, state) => {
    const row: Record<string, number | string> = { state }
    stackedKeys.forEach((key) => {
      row[key] = ageMap[key] ?? 0
    })
    mappedData.push(row)
  })

  const mockData = [
    { month: 'Jan', expense: 'audio', total: 34 },
    { month: 'Jan', expense: 'home', total: 20 },
    { month: 'Feb', expense: 'audio', total: 34 },
    { month: 'Feb', expense: 'audio', total: 2 },
  ]

  // loop over mockData to create reshaped and map keys
  return (
    <>
      <VertBarChart
        data={mockData}
        reshaped={[
          { month: 'Jan', audio: 34, home: 20 },
          { month: 'Feb', audio: 34, home: 2 },
        ]}
        ageGroups={['audio', 'home']}
      />
      {/* <VertBarChart data={data} reshaped={mappedData} ageGroups={stackedKeys} /> */}
    </>
  )
}
