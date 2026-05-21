import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 120,
        // 1. Đồng bộ màu cho Label (chữ "Mode" phía trên)
        '& .MuiInputLabel-root': { color: 'text.primary' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'text.primary' },

        // 2. Đồng bộ màu cho chữ bên trong ô Select và icon mũi tên xổ xuống
        '& .MuiSelect-select': { color: 'text.primary' },
        '& .MuiSelect-icon': { color: 'text.primary' },

        // 3. Đồng bộ màu viền (fieldset) tương tự ô Search của bạn
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: 'text.primary' }, // Viền mờ nhẹ hài hòa với nút Create
          '&:hover fieldset': { borderColor: 'text.primary' },
          '&.Mui-focused fieldset': { borderColor: 'text.primary' }
        }
      }}
      size="small"
    >
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          {/* Gắn màu text.primary cho Box và Icon để đồng bộ hoàn toàn */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary' }}>
            <LightModeIcon fontSize="small" sx={{ color: 'text.primary' }} /> Light
          </Box>
        </MenuItem>

        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary' }}>
            <DarkModeOutlinedIcon fontSize="small" sx={{ color: 'text.primary' }} /> Dark
          </Box>
        </MenuItem>

        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary' }}>
            <SettingsBrightnessIcon fontSize="small" sx={{ color: 'text.primary' }} />System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect