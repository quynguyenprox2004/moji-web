import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

function ListColumns() {
  return (
    <Box sx={{
      backgroundColor: 'inherit',
      width: '100%',
      height: '100%',
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      <Column />
      <Column />
      <Column />


      <Box sx={{
        minWidth: '300px',
        maxWidth: '300px',
        mx: 2,
        borderRadius: '6px',
        height: 'fit-content',
        backgroundColor: 'background.columns'
      }}>
        <Button
          startIcon={<AddIcon />}
          sx={{
            color: 'text.primary',
            width: '100%',
            justifyContent: 'flex-start',
            pl: 2,
            py: 1,
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.24)' : 'rgba(0, 0, 0, 0.16)')
            }
          }}
        >
          Add another list
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns