import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards() {
  return (
    <Box sx={{
      p: '0 5px 5px 5px',
      m: '0 5px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(
        ${theme.moji.boardContentHeight} - 
        ${theme.spacing(5)} - 
        ${theme.moji.columnHeaderHeight} - 
        ${theme.moji.columnFooterHeight}
      )`,
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
      '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
    }}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Box>
  )
}

export default ListCards