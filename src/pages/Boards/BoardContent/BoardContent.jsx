import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
// import Column from './ListColumns/Column/Column'

function BoardContent() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.moji.boardContentHeight,
      backgroundColor: 'background.default',
      p: '10px 0'
    }}>
      <ListColumns />
    </Box>
  )
}

export default BoardContent