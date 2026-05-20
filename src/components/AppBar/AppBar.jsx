import Box from '@mui/material/Box'
import { ReactComponent as MojiIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

function AppBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.moji.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: 2,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={MojiIcon} fontSize="small" inheritViewBox sx={{ color: 'white' }} />
          <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Moji</Typography>
        </Box>
        <TextField />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>

      </Box>
    </Box>
  )
}

export default AppBar
