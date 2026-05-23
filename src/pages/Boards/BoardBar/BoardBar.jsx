import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import IconButton from '@mui/material/IconButton'
import MoreIcon from '@mui/icons-material/MoreVert'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import RemoveIcon from '@mui/icons-material/Remove'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'

const MENU_STYLES = {
  color: 'text.primary',
  bgcolor: 'transparent',
  fontWeight: 'bold',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
  },
  '& .MuiChip-label': {
    fontSize: { xs: '0.8rem', sm: '0.9rem' } // Thu nhỏ nhẹ font chữ trên mobile
  }
}

function BoardBar() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}

      // --- KHỐI ĐỊNH VỊ: Giúp menu hiển thị ngang hàng tuyệt đối với nút bấm ---
      anchorOrigin={{
        vertical: 'top', // Điểm neo trên nút kích hoạt: Bắt đầu từ đỉnh nút
        horizontal: 'right' // Căn lề phải của nút kích hoạt
      }}
      transformOrigin={{
        vertical: 'top', // Điểm neo trên Menu: Khớp từ đỉnh Menu
        horizontal: 'right' // Khớp lề phải Menu trùng lề phải nút bấm
      }}

      // Thêm một chút tùy biến đệm viền ngoài cho danh sách menu phẳng hơn
      slotProps={{
        paper: {
          sx: {
            minWidth: '200px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Đổ bóng mờ nhẹ cao cấp
            borderRadius: '8px',
            paddingTop: 0, // Triệt tiêu khoảng trống thừa mặc định ở đỉnh menu
            paddingBottom: '4px',
            // Đồng bộ màu nền menu theo theme dark/light tự động của MUI
            backgroundColor: 'background.paper'
          }
        }
      }}
    >
      {/* --- THANH HEADER CỦA MENU --- */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
        borderBottom: '1px solid',

        // TỐI ƯU DARKMODE: Thay grey.200 cố định bằng màu divider tự động của hệ thống theme
        borderColor: (theme) => theme.palette.divider,

        mb: 1 // Tạo khoảng cách nhẹ với các nút chức năng bên dưới
      }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Menu
        </Typography>

        <IconButton
          size="small"
          onClick={handleMenuClose}
          sx={{
            p: '4px',
            color: 'text.primary',
            '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.04)' }
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* --- CÁC DIỆN MỤC MENUITEM --- */}
      <MenuItem
        onClick={handleMenuClose}
        sx={{
          mx: 0.5,
          borderRadius: '4px',
          py: 1
        }}
      >
        <IconButton size="small" sx={{ mr: 1, p: 0, color: 'text.primary' }}>
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          Close board
        </Typography>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.moji.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'background.boardBar',

      // Responsive padding: Màn hình nhỏ thu hẹp lề lại một chút
      px: { xs: 1.5, sm: 2 },
      gap: 1
    }}>
      {/* --- CỤM BÊN TRÁI: CHỨA CẢ TÊN BOARD VÀ TRẠNG THÁI PUBLIC --- */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 0.5, sm: 1 }, // Khoảng cách giữa 2 nút thu hẹp trên mobile
        overflow: 'hidden' // Ngăn chặn cụm này đè lấn nút Ba chấm bên phải
      }}>

        {/* Nút 1: Tên Board */}
        <Chip
          sx={{
            ...MENU_STYLES,
            // Xử lý text cắt dấu ba chấm thông minh nếu màn hình quá hẹp
            maxWidth: { xs: '140px', sm: '260px', md: '100%' },
            '& .MuiChip-label': {
              ...MENU_STYLES['& .MuiChip-label'],
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }}
          icon={<DashboardIcon />}
          label="CHUYÊN ĐỀ TỐT NGHIỆP"
          clickable
        />

        {/* Nút 2: Trạng thái Public/Private mới thêm */}
        <Chip
          sx={{
            ...MENU_STYLES,
            // Tránh bóp nghẹt chữ "Public" trên mobile
            minWidth: 'fit-content'
          }}
          icon={<VpnLockIcon />}
          label="Public"
          clickable
        />

      </Box>

      <IconButton
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{
          borderRadius: '5px',
          color: 'text.primary',
          // Tăng nhẹ vùng bấm khi sử dụng ngón tay thao tác trên điện thoại
          p: { xs: '8px', sm: '12px' },
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(227, 228, 242, 0.12)' : 'rgba(0, 0, 0, 0.16)')
          }
        }}
      >
        <MoreIcon />
      </IconButton>

      {renderMenu}
    </Box>
  )
}

export default BoardBar