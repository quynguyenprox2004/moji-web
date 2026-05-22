import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

const theme = extendTheme({
  moji: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#005180', // Hãy giữ một màu xanh đậm làm màu thương hiệu (để dùng cho nút bấm, link)
          contrastText: '#ffffff'
        },
        // Tập trung quản lý toàn bộ màu nền hệ thống ở đây
        background: {
          default: '#DFEBFE', // Mã màu của bạn: Dùng cho BoardContent (vùng nền lớn nhất)
          paper: '#FFFFFF', // Dùng cho các thanh Column và các thẻ Card công việc
          // Bạn hoàn toàn có thể tự tạo thêm thuộc tính con tùy ý trong background:
          appBar: '#FFFFFF', // Mã màu của bạn: AppBar trắng tinh
          boardBar: '#E7F1FD' // Mã màu của bạn: BoardBar xanh nhạt thanh lịch
        },
        text: {
          primary: '#172b4d', // Chữ màu xanh đen đậm để đọc rất rõ trên nền xanh nhạt của bạn
          secondary: '#5e6c84'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#005180', // Hãy giữ một màu xanh đậm làm màu thương hiệu (để dùng cho nút bấm, link)
          contrastText: '#ffffff'
        },
        // Tập trung quản lý toàn bộ màu nền hệ thống ở đây
        background: {
          default: '#172E51', // Mã màu của bạn: Dùng cho BoardContent (vùng nền lớn nhất)
          paper: '#1F1F21', // Dùng cho các thanh Column và các thẻ Card công việc
          // Bạn hoàn toàn có thể tự tạo thêm thuộc tính con tùy ý trong background:
          appBar: '#1F1F21', // Mã màu của bạn: AppBar trắng tinh
          boardBar: '#142138' // Mã màu của bạn: BoardBar xanh nhạt thanh lịch
        },
        text: {
          primary: '#FFFFFF', // Chữ màu xanh đen đậm để đọc rất rõ trên nền xanh nhạt của bạn
          secondary: '#5e6c84'
        }
      }
    }
  }
  // ...other properties
})

export default theme
