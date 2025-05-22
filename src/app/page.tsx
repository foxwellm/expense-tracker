import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import {
  BarChartContainer,
  DateRangeSliderContainer,
  // ChartDateBounds,
  ExpensesHydrator,
  SideDrawer,
  SideDrawerFab,
  // SunburstChartContainer,
} from './_components'

export default async function RootPage() {
  return (
    <>
      <ExpensesHydrator />
      <SideDrawerFab />
      <SideDrawer>
        <Container>
          <Box
            sx={{ aspectRatio: '16 / 9', marginTop: 4 }}
            display={'flex'}
            alignItems={'center'}
          >
            <BarChartContainer />
            <Box height={'100%'} paddingY={4}>
              <DateRangeSliderContainer />
            </Box>
          </Box>
          {/* <Box
                display={'flex'}
                justifyContent={'center'}
                sx={{ marginY: 4, maxHeight: 700 }}
              >
                <SunburstChartContainer />
              </Box> */}
          {/* </Box> */}
          {/* <Box overflow="visible">
              <Box
                position="sticky"
                top={100} // NavBar
              >
                <Box  display={'flex'} justifyContent={'center'}>
                  <Box height={500} minWidth={100}>
                    <DateRangeSlider />
                  </Box>
                </Box>
              </Box>
            </Box> */}
          {/* </Box> */}
        </Container>
      </SideDrawer>
    </>
  )
}
