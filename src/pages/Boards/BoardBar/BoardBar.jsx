import * as React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import { capitalizeFirstLetter } from '~/utils/formatters'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

// Import các sub-components vừa tách
import BoardUserGroup from './Menu/BoardUserGroup'
import BoardInvite from './Menu/BoardInvite'

const MENU_STYLES = {
  color: 'text.primary',
  bgcolor: 'transparent',
  fontWeight: 'bold',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#424E61' : '#C3CBD5'
  },
  '& .MuiChip-label': {
    fontSize: { xs: '0.8rem', sm: '0.9rem' }
  }
}

function BoardBar({ board }) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget)

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
      sx={{
        '& .MuiPaper-root': {
          width: '240px',
          color: 'text.primary',
          p: 1
        }
      }}
    >
      {/* ITEM 1: TÁI SỬ DỤNG CHUNG BOARDUSERGROUP TRÊN MOBILE (Cấu hình size nhỏ hơn xíu) */}
      <MenuItem disableRipple sx={{ bgcolor: 'transparent', '&:hover': { bgcolor: 'transparent' }, p: 0, mb: 1.5 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <BoardUserGroup max={5} size={32} fontSize={14} />
        </Box>
      </MenuItem>

      {/* ITEM 2: TÁI SỬ DỤNG CHUNG BOARDINVITE TRÊN MOBILE (Bật fullWidth và size nhỏ) */}
      <MenuItem disableRipple sx={{ bgcolor: 'transparent', '&:hover': { bgcolor: 'transparent' }, p: 0 }} onClick={handleMobileMenuClose}>
        <Box sx={{ width: '100%' }}>
          <BoardInvite fullWidth size="small" />
        </Box>
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
      px: { xs: 1.5, sm: 2 },
      gap: 1
    }}>
      {/* --- CỤM BÊN TRÁI: TÊN BOARD & TRẠNG THÁI --- */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, overflow: 'hidden' }}>
        <Chip
          sx={{
            ...MENU_STYLES,
            maxWidth: { xs: '220px', sm: '320px' },
            '& .MuiChip-label': {
              ...MENU_STYLES['& .MuiChip-label'],
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }}
          icon={<DashboardIcon color='text.primary' />}
          label={board?.title}
          clickable
        />

        <Chip
          sx={{ ...MENU_STYLES, minWidth: 'fit-content' }}
          icon={<VpnLockIcon color='text.primary' />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
      </Box>

      {/* --- CỤM BÊN PHẢI: DESKTOP VIEW (ẨN TRÊN XS, HIỂN THỊ TRÊN SM) --- */}
      <Box sx={{
        display: { xs: 'none', sm: 'flex' },
        alignItems: 'center',
        gap: 1
      }}>
        {/* Gọi gọn gàng hai Component con bằng các cấu hình tham số mặc định */}
        <BoardUserGroup max={5} size={30} fontSize={16} />
        <BoardInvite fullWidth={false} size="medium" />
      </Box>

      {/* --- CỤM BÊN PHẢI: MOBILE VIEW (CHỈ HIỂN THỊ NÚT 3 CHẤM TRÊN XS) --- */}
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
        <IconButton
          size="small"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          sx={{ color: 'text.primary' }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Box>

      {/* Khối JSX Render Menu rút gọn */}
      {renderMobileMenu}
    </Box>
  )
}

export default BoardBar