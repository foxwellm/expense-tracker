import { VertBarChart } from './VertBarChart'

export function VertBarChartContainer() {
  return (
    <>
      <VertBarChart
        monthlyExpenses={[
          { month: 'Jan 25', audio: 34, home: 20 },
          { month: 'Feb 25', audio: 34, home: 2 },
        ]}
        categories={['audio', 'home']}
      />
    </>
  )
}
