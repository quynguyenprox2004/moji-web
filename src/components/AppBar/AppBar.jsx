import * as React from 'react'
import { AppBar as MuiAppBar } from '@mui/material'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import SvgIcon from '@mui/material/SvgIcon'
import { ReactComponent as MojiIcon } from '~/assets/trello.svg'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import ModeSelect from '../ModeSelect/ModeSelect'
import Divider from '@mui/material/Divider'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

function AppBar() {
  const [searchValue, setSearchValue] = React.useState('')

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
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
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      {/* --- BỌC MODESELECT VÀO TRONG MENUITEM --- */}
      <MenuItem sx={{ p: 0, '& .MuiFormControl-root': { m: 0, width: '100%' } }}>
        <Box sx={{ width: '100%', px: 2, py: 0.5 }}>
          <ModeSelect />
        </Box>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Typography variant="body2">Notifications</Typography>
      </MenuItem>

      <MenuItem>
        <IconButton size="large" aria-label="" color="inherit">
          <Badge color="error">
            <HelpOutlineIcon />
          </Badge>
        </IconButton>
        <Typography variant="body2">Help</Typography>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menuId"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography variant="body2">Profile</Typography>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }} >
      <MuiAppBar position="static"
        sx={{
          width: '100%',
          height: (theme) => theme.moji.appBarHeight,
          backgroundColor: 'background.appBar',
          color: 'text.primary',
          borderBottom: '1px solid',
          // Tối ưu border tương thích với cả 2 chế độ màu hệ thống
          borderColor: (theme) => theme.palette.divider,
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ minHeight: '100% !important', px: { xs: '8px !important', sm: '12px !important' } }}>

          {/* Logo Area */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={MojiIcon} fontSize="medium" inheritViewBox />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontWeight: 'bold',
                letterSpacing: '1px'
              }}
            >
              MOJI
            </Typography>
          </Box>
          {/* Ô Tìm kiếm: Thu gọn nhãn & độ rộng tối thiểu trên mobile để nhường chỗ cho nút Create */}
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
                  {/* Đổi màu icon kính lúp theo màu chữ tương phản của theme */}
                  <SearchIcon sx={{ color: 'text.primary', fontSize: '1.1rem' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    fontSize="small"
                    sx={{
                      color: searchValue ? 'text.primary' : 'transparent',
                      cursor: searchValue ? 'pointer' : 'default'
                    }}
                    onClick={searchValue ? () => setSearchValue('') : undefined}
                  />
                </InputAdornment>
              )
            }}
            sx={{
              // Giảm minWidth xuống tối đa giúp Search tự co bóp khi màn hình hẹp
              minWidth: { xs: '60px', sm: '160px' },
              maxWidth: { xs: '180px', sm: '400px' },
              flexGrow: 1,
              ml: { xs: 1, sm: 2 },
              mr: 1,
              '& label': { color: 'text.primary', fontSize: { xs: '11px', sm: '14px' } },
              '& input': { color: 'text.primary', py: '6px' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'text.primary' },
                '&:hover fieldset': { borderColor: 'text.primary' },
                '&.Mui-focused fieldset': { borderColor: 'text.primary' }
              }
            }}
          />

          {/* Nút Create: Giữ chữ "Create" xuyên suốt, chỉ thu gọn lề (padding) và font chữ trên Mobile */}
          <Button
            variant="contained"
            size="small"
            sx={{
              color: 'text.primary',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgb(102, 157, 241)' : 'rgba(0, 0, 0, 0.08)'),
              height: '32px', // Cân đối lại chiều cao khít chuẩn size small
              fontWeight: 'bold',
              textTransform: 'none', // Giữ nguyên chữ "Create" không bị viết hoa toàn bộ
              whiteSpace: 'nowrap', // Tránh chữ bị xuống dòng khi màn hình bóp nhỏ
              boxShadow: 'none',
              // Thiết lập font-size và padding nhỏ hơn trên màn hình di động (xs)
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
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            <ModeSelect />
            <IconButton size="large" color="inherit">
              <Badge badgeContent={17} color="error"><NotificationsIcon /></Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge color="error"><HelpOutlineIcon /></Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {/* Khối chức năng bên phải - Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
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
