import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.moji.boardContentHeight,
      backgroundColor: 'background.default',

      // Responsive Padding: Trên mobile (xs) thu nhỏ khoảng cách top/bottom xuống 6px để tối ưu không gian dọc
      p: { xs: '6px 0', sm: '10px 0' },

      // --- TỐI ƯU TRẢI NGHIỆM TRÊN MOBILE/TABLET ---
      // Giúp hành vi cuộn ngang (scroll) mượt mà hơn rất nhiều trên các thiết bị màn hình cảm ứng
      overflowX: 'auto',
      overflowY: 'hidden',
      WebkitOverflowScrolling: 'touch',

      // Khóa hành vi kéo để tải lại trang (Pull-to-refresh) mặc định của trình duyệt mobile
      // Tránh việc người dùng đang vuốt các Column Trello thì vô tình làm load lại trang web
      overscrollBehavior: 'contain'
    }}>
      <ListColumns />
    </Box>
  )
}

export default BoardContent