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

// Component từ MUI hỗ trợ icon cho MenuItem
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SettingsIcon from '@mui/icons-material/Settings'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

// Import các sub-components
import BoardUserGroup from './BoardUserGroup'
import BoardInvite from './BoardInvite'

import { useDispatch } from 'react-redux'
import { updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { updateBoardDetailsAPI, deleteBoardAPI } from '~/apis' // ✨ IMPORT THÊM ĐƯỜNG API XÓA BOARD Ở ĐÂY
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'

import { useConfirm } from 'material-ui-confirm'
import { useNavigate } from 'react-router-dom' // ✨ IMPORT THÊM ĐỂ ĐIỀU HƯỚNG TRANG
import { toast } from 'react-toastify' // ✨ IMPORT ĐỂ BẮN THÔNG BÁO POPUP

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
  const navigate = useNavigate() // ✨ KHỞI TẠO HOOK ĐIỀU HƯỚNG

  // --- STATE & HANDLER CHO MOBILE MENU ---
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)
  const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget)
  const mobileMenuId = 'primary-search-account-menu-mobile'

  // --- STATE & HANDLER CHO DESKTOP MENU (MORE ACTIONS) ---
  const [desktopMenuAnchorEl, setDesktopMenuAnchorEl] = React.useState(null)
  const isDesktopMenuOpen = Boolean(desktopMenuAnchorEl)
  const handleDesktopMenuOpen = (event) => setDesktopMenuAnchorEl(event.currentTarget)
  const handleDesktopMenuClose = () => setDesktopMenuAnchorEl(null)
  const desktopMenuId = 'basic-menu-column-dropdown'

  const confirmDeleteBoard = useConfirm()
  // ✨ VIẾT LẠI HÀM XỬ LÝ XÓA BOARD HOÀN CHỈNH
  const handleDeleteBoard = () => {
    // 1. Đóng cái Menu Dropdown ngay lập tức để UI nhìn mượt mà
    handleDesktopMenuClose()

    confirmDeleteBoard({
      title: 'Delete Board?',
      description: 'This action will permanently delete this Board and all its Columns/Cards! Are you sure?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    }).then(() => {
      // 2. Gọi API xuống Backend để Cascade Delete (Xóa Sạch Board -> Column -> Card)
      deleteBoardAPI(board._id).then((res) => {
        // 3. Hiển thị thông báo thành công từ BE trả về
        toast.success(res?.deleteResult || 'Board deleted successfully!')
        // 4. Đá người dùng văng ngay về trang danh sách Workspace / Boards tổng
        navigate('/boards')
      }).catch((error) => {
        toast.error(error?.message || 'Something went wrong while deleting the board!')
      })
    }).catch(() => { })
  }

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

  // --- RENDER DESKTOP MENU ---
  const renderDesktopMenu = (
    <Menu
      id={desktopMenuId}
      anchorEl={desktopMenuAnchorEl}
      open={isDesktopMenuOpen}
      onClose={handleDesktopMenuClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={handleDesktopMenuClose}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Board Settings</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleDeleteBoard} sx={{ color: 'error.main' }}>
        <ListItemIcon>
          <DeleteForeverIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText>Delete Board</ListItemText>
      </MenuItem>
    </Menu>
  )

  // Hàm xử lý gọi API cập nhật tên Board
  const onUpdateBoardTitle = async (newTitle) => {
    const updatedBoard = await updateBoardDetailsAPI(board._id, { title: newTitle })
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
        <Tooltip title={board?.description || 'Board Description'}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            borderRadius: '4px'
          }}>
            <DashboardIcon fontSize="small" sx={{ color: 'text.primary' }} />
            <ToggleFocusInput
              value={board?.title}
              onChangedValue={onUpdateBoardTitle}
              inputFontSize="16px"
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
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
        <BoardUserGroup />
        <BoardInvite fullWidth={false} size="medium" />
        <Tooltip title="Board Actions">
          <IconButton
            sx={{
              color: 'text.primary',
              borderRadius: '5px',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2A2C21' : '#D1D3D4')
              }
            }}
            id="basic-column-dropdown"
            aria-controls={isDesktopMenuOpen ? desktopMenuId : undefined}
            aria-haspopup="true"
            aria-expanded={isDesktopMenuOpen ? 'true' : undefined}
            onClick={handleDesktopMenuOpen}
          >
            <MoreHorizIcon />
          </IconButton>
        </Tooltip>
      </Box >

      {/* --- CỤM BÊN PHẢI: MOBILE VIEW --- */}
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
      </Box >

      {/* RENDER CÁC MENU TRẠNG THÁI ẨN */}
      {renderMobileMenu}
      {renderDesktopMenu}
    </Box >
  )
}

export default BoardBar