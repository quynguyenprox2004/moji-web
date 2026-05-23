import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards({ cards }) {
  return (
    <Box sx={{
      // Responsive padding & margin: Màn hình nhỏ (xs) thu gọn không gian, màn hình lớn (sm) rộng rãi hơn
      p: { xs: '0 4px 4px 4px', sm: '0 5px 5px 5px' },
      m: { xs: '0 4px', sm: '0 5px' },

      display: 'flex',
      flexDirection: 'column',
      gap: 1,

      // Quản lý trạng thái cuộn khu vực danh sách card
      overflowX: 'hidden',
      overflowY: 'auto',

      // Tính toán chiều cao tối đa động dựa trên cấu hình chiều cao hệ thống
      maxHeight: (theme) => `calc(
        ${theme.moji.boardContentHeight} - 
        ${theme.spacing(5)} - 
        ${theme.moji.columnHeaderHeight} - 
        ${theme.moji.columnFooterHeight}
      )`
    }}>
      {cards?.map(card => <Card key={card._id} card={card} />)}
    </Box>
  )
}

export default ListCards