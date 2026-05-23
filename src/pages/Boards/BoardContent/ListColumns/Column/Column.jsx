import React from 'react'
import Box from '@mui/material/Box'
import ListCards from './ListCards/ListCards'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'


function Column() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }
  return (
    <Box sx={{
      minWidth: '300px',
      maxWidth: '300px',
      backgroundColor: 'background.columns',
      ml: 2,
      borderRadius: '6px',
      height: 'fit-content',
      maxHeight: (theme) => `calc(${theme.moji.boardContentHeight} - ${theme.spacing(5)})`
    }}>

      {/* Box Column Header */}
      <Box sx={{
        height: (theme) => theme.moji.columnHeaderHeight,
        p: '10px 5px',
        mx: '5px',
        gap: 0.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'text.primary'
      }}>
        <Typography variant="h6" component="div"
          sx={{
            fontSize: '1rem',
            color: 'text.primary',
            fontWeight: 'bold',
            cursor: 'pointer',
            flexGrow: 1
            // bgcolor: 'rgba(0,0,0,0.3)' // đang test
          }}>
          Column Title
        </Typography>
        <Box>
          <Tooltip title="List actions">
            <IconButton
              id="basic-column-dropdown"
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                color: 'text.primary',
                borderRadius: '5px',
                p: '6px',
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(227, 228, 242, 0.12)' : 'rgba(0, 0, 0, 0.16)')
                }
              }} >
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="basic-menu-column-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-column-dropdown'
            }}
          >
            <MenuItem>
              <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Add card</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Remove this column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <ListCards />

      {/* Box Column Footer */}
      <Box sx={{
        height: (theme) => theme.moji.columnFooterHeight,
        p: '10px 5px',
        mx: '5px',
        gap: 0.5,
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary'
      }}>
        <Button
          size="medium"
          startIcon={<AddIcon />}
          sx={{
            color: 'text.primary',
            flexGrow: 1,
            justifyContent: 'flex-start',
            textTransform: 'none',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(227, 228, 242, 0.12)' : 'rgba(0, 0, 0, 0.16)')
            }
          }}>
          Add a card
        </Button>
        <Tooltip title="Drag to move">
          <IconButton size="medium" sx={{
            color: 'text.primary',
            borderRadius: '5px',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(227, 228, 242, 0.12)' : 'rgba(0, 0, 0, 0.16)')
            }
          }} >
            <DragHandleIcon sx={{ cursor: 'grab' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column