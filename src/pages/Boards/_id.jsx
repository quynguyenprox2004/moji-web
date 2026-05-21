import Container from '@mui/material/Container'
import PrimarySearchAppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <PrimarySearchAppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
