import * as React from 'react'
import { AppBar as MuiAppBar } from '@mui/material'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as MojiIcon } from '~/assets/trello.svg'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import ModeSelect from '../ModeSelect/ModeSelect'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'

// IMPORT COMPONENT PROFILES (DÙNG CHO DESKTOP)
import Profiles from './Menu/Profiles'

function AppBar() {
  const [searchValue, setSearchValue] = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    // 1. Lấy điểm neo từ chính nút Ba Chấm trên thanh AppBar đang mở Menu Mobile
    if (mobileMoreAnchorEl) {
      setAnchorEl(mobileMoreAnchorEl)
    } else {
      setAnchorEl(event.currentTarget)
    }

    // 2. Đóng menu mobile sau khi menu desktop đã xác định được điểm neo
    handleMobileMenuClose()
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      disableEnforceFocus // <-- THÊM DÒNG NÀY. Bổ sung các thuộc tính vô hiệu hóa bẫy Focus của MUI
      disableAutoFocusItem={true} // <-- THÊM DÒNG NÀY. Bổ sung các thuộc tính vô hiệu hóa bẫy Focus của MUI
      sx={{
        '& .MuiPaper-root': {
          width: '200px', // Khóa nhẹ độ rộng menu mobile cho các item chữ dài nhìn đều đặn
          color: 'text.primary',
          mt: 1.3
        }
      }}
    >
      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>
        <Avatar sx={{ width: 28, height: 28, mr: 1.5 }} /> Profile
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>
        <ListItemIcon sx={{ color: 'text.primary' }}>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>
        <ListItemIcon sx={{ color: 'text.primary' }}>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>

      <Divider sx={{ my: 0.5 }} />

      <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.875rem' }}>
        <ListItemIcon sx={{ color: 'text.primary' }}>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  )

  // --- MENU RESPONSIVE TRÊN MOBILE (ĐÃ TRẢI PHẲNG TÍNH NĂNG) ---
  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      disableEnforceFocus // <-- THÊM DÒNG NÀY. Bổ sung các thuộc tính vô hiệu hóa bẫy Focus của MUI
      sx={{
        '& .MuiPaper-root': {
          width: '200px', // Khóa nhẹ độ rộng menu mobile cho các item chữ dài nhìn đều đặn
          color: 'text.primary',
          mt: 1.3
        }
      }}
    >
      {/*  PROFILE*/}
      <MenuItem onClick={handleProfileMenuOpen} sx={{ fontSize: '0.875rem' }}>
        <Avatar sx={{ width: 24, height: 24, mr: 2 }} src="https://trungquandev.com/wp-content/uploads/2023/05/main-avatar-circle-min-trungquandev-codetq.jpeg" />
        Profile
      </MenuItem>

      <Divider sx={{ my: 0.5 }} />

      {/* 1. Chế độ giao diện (Light/Dark) */}
      <MenuItem sx={{ p: 0, '& .MuiFormControl-root': { m: 0, width: '100%' } }}>
        <Box sx={{ width: '100%', px: 2, py: 0.5 }}>
          <ModeSelect />
        </Box>
      </MenuItem>

      {/* 2. Thông báo hệ thống */}
      <MenuItem onClick={handleMobileMenuClose} sx={{ fontSize: '0.875rem' }}>
        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ mr: 2, cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'text.primary' }} />
          </Badge>
        </Tooltip>
        Notifications
      </MenuItem>

      {/* 3. Trợ giúp */}
      <MenuItem onClick={handleMobileMenuClose} sx={{ fontSize: '0.875rem' }}>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ mr: 2, cursor: 'pointer', color: 'text.primary' }} />
        </Tooltip>
        Help
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }} >
      <MuiAppBar
        position="static"
        sx={{
          width: '100%',
          height: (theme) => theme.moji.appBarHeight,
          backgroundColor: 'background.appBar',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: (theme) => theme.palette.divider,
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ minHeight: '100% !important', px: { xs: '8px !important', sm: '12px !important' } }}>

          {/* Logo Area */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}>
            <SvgIcon component={MojiIcon} fontSize="medium" inheritViewBox />
            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', letterSpacing: '1px' }}>
              MOJI
            </Typography>
          </Box>

          {/* Ô Tìm kiếm */}
          <TextField
            id="outlined-search"
            label="Search"
            type="text"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.primary', fontSize: '1.1rem' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    fontSize="small"
                    sx={{ color: searchValue ? 'text.primary' : 'transparent', cursor: searchValue ? 'pointer' : 'default' }}
                    onClick={searchValue ? () => setSearchValue('') : undefined}
                  />
                </InputAdornment>
              )
            }}
            sx={{
              minWidth: { xs: '60px', sm: '160px' },
              maxWidth: { xs: '180px', sm: '400px' },
              flexGrow: 1,
              ml: { xs: 1, sm: 2 },
              mr: 1,
              '& label': { color: 'text.primary', fontSize: { xs: '11px', sm: '14px' } },
              '& input': { color: 'text.primary', py: '6px' }
            }}
          />

          {/* Nút Create */}
          <Button
            variant="contained"
            size="small"
            sx={{
              color: 'text.primary',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgb(102, 157, 241)' : 'rgba(0, 0, 0, 0.08)'),
              height: '32px',
              fontWeight: 'bold',
              textTransform: 'none',
              whiteSpace: 'nowrap',
              boxShadow: 'none',
              fontSize: { xs: '12px', sm: '13px' },
              px: { xs: '8px', sm: '12px' },
              minWidth: 'fit-content',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgb(143, 184, 246)' : 'rgba(0, 0, 0, 0.16)')
              }
            }}
          >
            Create
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          {/* Khối chức năng bên phải - Desktop */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
            <ModeSelect />

            <Tooltip title="Notifications">
              <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
                <NotificationsNoneIcon sx={{ color: 'text.primary' }} />
              </Badge>
            </Tooltip>

            <Tooltip title="Help">
              <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'text.primary' }} />
            </Tooltip>

            {/* Gọi Profiles động cấp Desktop */}
            <Profiles />
          </Box>

          {/* Khối chức năng bên phải - Mobile */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton size="medium" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} sx={{
              color: 'text.primary',
              // cursor: 'pointer',
              borderRadius: '5px',
              // p: '0',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2A2C21' : '#D1D3D4')
              }
            }} >
              <MoreHorizIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </MuiAppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box >
  )
}

export default AppBar