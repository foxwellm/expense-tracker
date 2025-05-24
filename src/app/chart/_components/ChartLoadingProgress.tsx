import LinearProgress from '@mui/material/LinearProgress'

export function ChartLoadingProgress() {
  return (
    <LinearProgress
      sx={{
        position: 'absolute',
        width: '93%',
        bottom: 0,
        right: 0,
      }}
    />
  )
}
