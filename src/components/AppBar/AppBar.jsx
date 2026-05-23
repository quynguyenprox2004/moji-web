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
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  // --- MENU RESPONSIVE TRÊN MOBILE (ĐÃ TRẢI PHẲNG TÍNH NĂNG) ---
  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{
        '& .MuiPaper-root': {
          width: '200px', // Khóa nhẹ độ rộng menu mobile cho các item chữ dài nhìn đều đặn
          color: 'text.primary'
        }
      }}
    >
      {/* 1. Chế độ giao diện (Light/Dark) */}
      <MenuItem sx={{ p: 0, '& .MuiFormControl-root': { m: 0, width: '100%' } }}>
        <Box sx={{ width: '100%', px: 2, py: 0.5 }}>
          <ModeSelect />
        </Box>
      </MenuItem>

      {/* 2. Thông báo hệ thống */}
      <MenuItem onClick={handleMobileMenuClose} sx={{ fontSize: '0.875rem' }}>
        {/* <IconButton size="small" color="inherit" sx={{ mr: 1 }}>
          <Badge badgeContent={17} color="error">
            <NotificationsIcon fontSize="small" />
          </Badge>
        </IconButton> */}
        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ mr: 2, cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'text.primary' }} />
          </Badge>
        </Tooltip>
        Notifications
      </MenuItem>

      {/* 3. Trợ giúp */}
      <MenuItem onClick={handleMobileMenuClose} sx={{ fontSize: '0.875rem' }}>
        {/* <IconButton size="small" color="inherit" sx={{ mr: 1 }}>
          <HelpOutlineIcon fontSize="small" />
        </IconButton> */}
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ mr: 2, cursor: 'pointer', color: 'text.primary' }} />
        </Tooltip>
        Help
      </MenuItem>

      <Divider sx={{ my: 0.5 }} />

      {/* --- CÁC TÍNH NĂNG TRẢI PHẲNG TỪ PROFILE XUỐNG --- */}
      <MenuItem onClick={handleMobileMenuClose} sx={{ fontSize: '0.875rem' }}>
        <Avatar sx={{ width: 24, height: 24, mr: 2 }} src="https://trungquandev.com/wp-content/uploads/2023/05/main-avatar-circle-min-trungquandev-codetq.jpeg" />
        Profile
      </MenuItem>

      <MenuItem onClick={handleMobileMenuClose} sx={{ fontSize: '0.875rem' }}>
        <Avatar sx={{ width: 24, height: 24, mr: 2 }} />
        My account
      </MenuItem>

      <MenuItem onClick={handleMobileMenuClose} sx={{ fontSize: '0.875rem' }}>
        <ListItemIcon sx={{ color: 'text.primary', minWidth: '36px !important' }}>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add account
      </MenuItem>

      <MenuItem onClick={handleMobileMenuClose} sx={{ fontSize: '0.875rem' }}>
        <ListItemIcon sx={{ color: 'text.primary', minWidth: '36px !important' }}>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>

      <MenuItem onClick={handleMobileMenuClose} sx={{ fontSize: '0.875rem' }}>
        <ListItemIcon sx={{ color: 'text.primary', minWidth: '36px !important' }}>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
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
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
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
            <IconButton size="large" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
              <MoreHorizIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </MuiAppBar>
      {renderMobileMenu}
    </Box >
  )
}

export default AppBar