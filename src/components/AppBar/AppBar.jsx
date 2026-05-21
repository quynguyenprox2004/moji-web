import * as React from 'react'
import AppBar from '@mui/material/AppBar'
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

function PrimarySearchAppBar() {
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
        <IconButton size="large" aria-label="" color="inherit">
          <Badge color="error">
            <HelpOutlineIcon />
          </Badge>
        </IconButton>
        <p>Help</p>
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
        <p>Notifications</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static"
        sx={{
          backgroundColor: 'background.appBar',
          color: 'text.primary',
          borderBottom: '1px solid rgb(23, 43, 77, 0.16)'
        }}
      >
        <Toolbar>
          <SvgIcon component={MojiIcon} fontSize="medium" inheritViewBox
            sx={{
              mr: 0.5
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MOJI
          </Typography>
          <TextField
            id="outlined-search"
            label="Search..."
            type="text"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {/* Đổi màu icon kính lúp theo màu chữ tương phản của theme */}
                  <SearchIcon sx={{ color: 'text.primary' }} />
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
              minWidth: '120px',
              width: '100%', // Ép TextField chiếm hết không gian của khung chứa nó
              maxWidth: '500px', // Nâng giới hạn từ 500px lên 750px (hoặc tùy bạn chỉnh)
              ml: 2,
              mr: 0.5,
              '& label': { color: 'text.primary' },
              '& input': { color: 'text.primary' },
              '& label.Mui-focused': { color: 'text.primary' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'text.primary' },
                '&:hover fieldset': { borderColor: 'text.primary' },
                '&.Mui-focused fieldset': { borderColor: 'text.primary' }
              }
            }}
          />
          <Button
            variant="contained"
            size="small"
            sx={{
              color: 'text.primary',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgb(102, 157, 241)' : 'rgba(0, 0, 0, 0.16)'),
              height: '40px', // Cao bằng khít với TextField size="small"
              fontWeight: 'bold',
              textTransform: 'none', // Giữ nguyên chữ "Create" không bị viết hoa toàn bộ
              whiteSpace: 'nowrap', // Tránh chữ bị xuống dòng khi màn hình bóp nhỏ
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgb(143, 184, 246)' : 'rgba(0, 0, 0, 0.32)')
              }
            }}
          >
            Create
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <ModeSelect />
            <IconButton size="large" aria-label="" color="inherit">
              <Badge color="error">
                <HelpOutlineIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box >
  )
}

export default PrimarySearchAppBar
