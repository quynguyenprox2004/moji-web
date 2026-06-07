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
          main: '#005180',
          contrastText: '#ffffff'
        },
        background: {
          default: '#FFFFFF',
          paper: '#FFFFFF',
          appBar: '#FFFFFF',
          boardBar: '#EBF3FE',
          boardContent: '#DCE9FE',
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
          boardContent: '#1B2C47',
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
          // Cấu hình chung cho toàn bộ thanh cuộn trên trang
          '*::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.mode === 'dark' ? '#4d4d4d' : '#dcdde1',
            borderRadius: '6px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#686868' : '#b2b3b8'
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
          // TỐI ƯU: Đảm bảo nhãn của input luôn ăn theo màu text chuẩn hệ thống, đỡ phải viết đi viết lại ở component
          color: theme.palette.text.primary,
          '&.Mui-focused': { color: theme.palette.text.primary }
        })
      }
    },
    // MuiTypography: {
    //   styleOverrides: {
    //     root: {
    //       '&.MuiTypography-body1': { fontSize: '0.875rem' }
    //     }
    //   }
    // },
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
