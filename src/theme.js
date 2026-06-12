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
  // TỐI ƯU: Đưa font-size của body1 ra ngoài cấu hình gốc chuẩn MUI
  typography: {
    body1: {
      fontSize: '0.875rem'
    }
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#005180',
          contrastText: '#ffffff'
        },
        background: {
          default: '#FFFFFF',
          paper: '#FFFFFF',
          appBar: '#FFFFFF',
          boardBar: '#EBF3FE',
          boardContent: '#D8E6FD',
          columns: '#F1F2F4'
        },
        text: {
          primary: '#172B4D',
          secondary: '#292A2E'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#005180',
          contrastText: '#ffffff'
        },
        background: {
          default: '#1F1F21',
          paper: '#1F1F21',
          appBar: '#1F1F21',
          boardBar: '#13223A',
          boardContent: '#182F52',
          columns: '#101204'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#CECFD2'
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          '*::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          // Mặc định ban đầu cho Light Mode
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '6px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#b2b3b8'
          },
          // TỐI ƯU: Sử dụng selector động để tự ăn theo Dark Mode khi chuyển đổi giao diện
          [theme.getColorSchemeSelector('dark')]: {
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: '#4d4d4d'
            },
            '*::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#686868'
            }
          }
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
          // Nhãn mặc định sẽ có màu dịu nhẹ text.secondary
          color: theme.palette.text.secondary,
          // Khi click vào ô input, nhãn sẽ chuyển sang màu Primary (Xanh) hoặc Text Primary tùy bạn chọn tạo điểm nhấn focus
          '&.Mui-focused': { color: theme.palette.primary.main }
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: '0.875rem',
          color: theme.palette.text.primary,

          // TỐI ƯU: Loại bỏ hoàn toàn !important để có hiệu ứng chuyển đổi mượt mà (Good UX)
          '& fieldset': {
            borderWidth: '1px',
            borderColor: theme.palette.text.secondary // Trạng thái bình thường: mờ nhẹ
          },
          '&:hover fieldset': {
            borderWidth: '1px',
            borderColor: theme.palette.text.primary // Hover vào: đậm lên rõ ràng
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1.5px', // Hơi dày lên một chút khi focus
            borderColor: theme.palette.primary.main // Chuyển sang màu xanh định dạng hành động gõ chữ
          }
        })
      }
    }
  }
})

export default theme