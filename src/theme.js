import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const theme = extendTheme({
  moji: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
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
          boardBar: '#E7F1FD', // Mã màu của bạn: BoardBar xanh nhạt thanh lịch
          columns: '#F1F2F4'
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
          boardBar: '#142138', // Mã màu của bạn: BoardBar xanh nhạt thanh lịch
          columns: '#101204'
        },
        text: {
          primary: '#FFFFFF', // Chữ màu xanh đen đậm để đọc rất rõ trên nền xanh nhạt của bạn
          secondary: '#5e6c84'
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          // Cấu hình chung cho toàn bộ thanh cuộn trên trang
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            // TỐI ƯU: Sử dụng luôn token màu palette của hệ thống thay vì fix cứng mã #hash màu
            backgroundColor: theme.palette.mode === 'dark' ? '#4d4d4d' : '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#686868' : '#b2b3b8'
          },

          // Hỗ trợ thêm cho trình duyệt Firefox
          scrollbarWidth: 'thin',
          scrollbarColor: theme.palette.mode === 'dark'
            ? '#4d4d4d transparent'
            : '#dcdde1 transparent'
        }
      })
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': { borderWidth: '0.5px' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: '0.875rem',
          // TỐI ƯU: Đảm bảo nhãn của input luôn ăn theo màu text chuẩn hệ thống, đỡ phải viết đi viết lại ở component
          color: theme.palette.text.primary,
          '&.Mui-focused': { color: theme.palette.text.primary }
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: '0.875rem',
          color: theme.palette.text.primary, // Đảm bảo chữ nhập vào luôn rõ ràng ở cả 2 mode

          // TỐI ƯU TOÀN DIỆN BORDER BIẾN ĐỔI THEO TEXT.PRIMARY CỦA TRELLO
          '& fieldset': {
            borderWidth: '0.5px !important',
            borderColor: `${theme.palette.text.primary} !important`
          },
          '&:hover fieldset': {
            borderWidth: '1px !important',
            borderColor: `${theme.palette.text.primary} !important`
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px !important',
            borderColor: `${theme.palette.text.primary} !important`
          }
        })
      }
    }
  }
  // ...other properties
})

export default theme
