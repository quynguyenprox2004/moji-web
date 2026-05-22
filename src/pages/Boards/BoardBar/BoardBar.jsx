import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import IconButton from '@mui/material/IconButton'
import MoreIcon from '@mui/icons-material/MoreVert'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import RemoveIcon from '@mui/icons-material/Remove'
import Typography from '@mui/material/Typography' // Khuyên dùng để đồng bộ font chữ
import CloseIcon from '@mui/icons-material/Close'

function BoardBar() {
  // 1. Đổi chữ A viết hoa thành viết thường chuẩn quy tắc React
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
            paddingBottom: '4px'
          }
        }
      }}
    >
      {/* --- THANH HEADER CỦA MENU: Chứa chữ Menu và nút X --- */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'grey.200', // Tạo đường gạch mảnh ngăn cách phần header
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

      {/* --- CÁC DIỆN MỤC MENUITEM KHÁC BÊN DƯỚI --- */}
      <MenuItem
        onClick={handleMenuClose}
        sx={{
          mx: 0.5,
          borderRadius: '4px',
          py: 1
        }}
      >
        <IconButton size="small" sx={{ mr: 1, p: 0 }}>
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
      px: '12px'
    }}>
      {/* 4. Đã loại bỏ thẻ Box bọc thừa xung quanh Chip */}
      <Chip
        sx={{
          color: 'text.primary',
          bgcolor: 'transparent',
          fontWeight: 'bold',
          borderRadius: '4px',
          // Tăng trải nghiệm re chuột bằng cách đổi màu nền nhẹ khi hover
          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
        }}
        icon={<DashboardIcon />}
        label="CHUYÊN ĐỀ TỐT NGHIỆP"
        clickable
      />

      <IconButton
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{ color: 'text.primary' }} // Đảm bảo icon ba dấu chấm ăn theo màu chữ hệ thống
      >
        <MoreIcon />
      </IconButton>

      {renderMenu}
    </Box>
  )
}

export default BoardBar