import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 34, height: 34 }}
            alt="TrungQuanDev"
            src="https://trungquandev.com/wp-content/uploads/2023/05/main-avatar-circle-min-trungquandev-codetq.jpeg"
          />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
        sx={{
          '& .MuiPaper-root': {
            color: 'text.primary',
            backgroundColor: 'background.paper',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            mt: 0.5
          }
        }}
      >
        <MenuItem onClick={handleClose} sx={{ fontSize: '0.875rem' }}>
          <Avatar sx={{ width: 28, height: 28, mr: 1.5 }} /> Profile
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ fontSize: '0.875rem' }}>
          <Avatar sx={{ width: 28, height: 28, mr: 1.5 }} /> My account
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem onClick={handleClose} sx={{ fontSize: '0.875rem' }}>
          <ListItemIcon sx={{ color: 'text.primary' }}>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ fontSize: '0.875rem' }}>
          <ListItemIcon sx={{ color: 'text.primary' }}>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <Divider sx={{ my: 0.5 }} />

        <MenuItem onClick={handleClose} sx={{ fontSize: '0.875rem' }}>
          <ListItemIcon sx={{ color: 'text.primary' }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles