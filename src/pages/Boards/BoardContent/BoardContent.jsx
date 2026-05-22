import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.moji.boardContentHeight,
      backgroundColor: 'background.default'
    }}>
      Board Content
    </Box>
  )
}

export default BoardContent