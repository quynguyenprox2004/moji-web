import * as React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { capitalizeFirstLetter } from '~/utils/formatters'
import Tooltip from '@mui/material/Tooltip'
// Import các sub-components vừa tách
import BoardUserGroup from './BoardUserGroup'
import BoardInvite from './BoardInvite'

// MỞ COMMENT CÁC IMPORT ĐÃ BỊ ẨN
import { useDispatch } from 'react-redux'
import { updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { updateBoardDetailsAPI } from '~/apis'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'

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
  const dispatch = useDispatch()

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
      <MenuItem disableRipple sx={{ bgcolor: 'transparent', '&:hover': { bgcolor: 'transparent' }, p: 0, mb: 1.5 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <BoardUserGroup max={5} size={32} fontSize={14} />
        </Box>
      </MenuItem>

      <MenuItem disableRipple sx={{ bgcolor: 'transparent', '&:hover': { bgcolor: 'transparent' }, p: 0 }} onClick={handleMobileMenuClose}>
        <Box sx={{ width: '100%' }}>
          <BoardInvite fullWidth size="small" />
        </Box>
      </MenuItem>
    </Menu>
  )

  // Hàm xử lý gọi API cập nhật tên Board (Sử dụng luôn prop `board` từ cha truyền xuống cho chuẩn)
  const onUpdateBoardTitle = async (newTitle) => {
    const updatedBoard = await updateBoardDetailsAPI(board._id, { title: newTitle })

    // Cập nhật lại dữ liệu Board trong Redux
    dispatch(updateCurrentActiveBoard({
      ...board,
      ...updatedBoard
    }))
  }

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

        {/* FIX LỖI TOOLTIP: Bọc toàn bộ cụm Title vào 1 thẻ Box duy nhất để Tooltip không bị crash */}
        <Tooltip title={board?.description || 'Board Description'}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            // px: '12px',
            // py: '4px',
            borderRadius: '4px'
          }}>
            <DashboardIcon fontSize="small" sx={{ color: 'text.primary' }} />
            <ToggleFocusInput
              value={board?.title}
              onChangedValue={onUpdateBoardTitle}
              inputFontSize="16px"
              sx={{
                // Custom CSS riêng cho Input tại BoardBar để nó không chiếm diện tích bừa bãi
                maxWidth: { xs: '160px', sm: '240px' },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'transparent',
                  '& fieldset': { borderColor: 'transparent' }
                },
                '& .MuiOutlinedInput-root.Mui-focused': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#33485D' : 'white',
                  '& fieldset': { borderColor: 'primary.main' }
                }
              }}
            />
          </Box>
        </Tooltip>

        <Chip
          sx={{ ...MENU_STYLES, minWidth: 'fit-content' }}
          icon={<VpnLockIcon color='text.primary' />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
      </Box >

      {/* --- CỤM BÊN PHẢI: DESKTOP VIEW --- */}
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }
      }>
        <BoardUserGroup />
        <BoardInvite fullWidth={false} size="medium" />
      </Box >

      {/* --- CỤM BÊN PHẢI: MOBILE VIEW --- */}
      < Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
        <IconButton
          size="small"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          sx={{ color: 'text.primary' }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Box >

      {renderMobileMenu}
    </Box >
  )
}

export default BoardBar