import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export function Loading({ width, height }: { width: number; height: number }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        position: 'relative',
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <Skeleton
        variant="rectangular"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: 4,
        }}
      />
    </Box>
  )
}
