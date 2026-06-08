import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

function BoardInvite({ fullWidth = false, size = 'medium' }) {
  return (
    <Button
      variant="contained"
      startIcon={<PersonAddIcon />}
      size={size}
      fullWidth={fullWidth}
      sx={{
        color: 'text.primary',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgb(102, 157, 241)' : 'rgba(0, 0, 0, 0.08)'),
        textTransform: 'none',
        whiteSpace: 'nowrap',
        boxShadow: 'none',
        fontWeight: 'bold',
        minWidth: 'fit-content',
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgb(143, 184, 246)' : 'rgba(0, 0, 0, 0.16)')
        }
      }}
    >
      Invite
    </Button>
  )
}

export default BoardInvite