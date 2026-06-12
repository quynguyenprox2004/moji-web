import { useState } from 'react'
import TextField from '@mui/material/TextField'

function ToggleFocusInput({ value, onChangedValue, inputFontSize = '16px', singleLine = false, maxLines = 1, ...props }) {
  const [inputValue, setInputValue] = useState(value)

  const triggerBlur = () => {
    setInputValue(inputValue.trim())

    if (!inputValue || inputValue.trim() === value) {
      setInputValue(value)
      return
    }

    onChangedValue(inputValue)
  }

  return (
    <TextField
      id="toggle-focus-input-controlled"
      variant='outlined'
      size="small"
      value={inputValue}
      onChange={(event) => { setInputValue(event.target.value) }}
      onBlur={triggerBlur}
      {...props}
      sx={{
        width: '100%',
        minWidth: 0,

        '& .MuiOutlinedInput-root': {
          backgroundColor: 'transparent',
          '& fieldset': {
            borderColor: 'transparent'
          }
        },

        '& .MuiOutlinedInput-root:hover': {
          '& fieldset': {
            borderColor: 'transparent'
          }
        },

        '& .MuiOutlinedInput-root.Mui-focused': {
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? '#33485D'
              : 'white',
          '& fieldset': {
            borderColor: 'primary.main'
          }
        },

        '& .MuiOutlinedInput-input': {
          px: '6px',
          fontSize: inputFontSize,
          fontWeight: 'bold',

          ...(singleLine
            ? {
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }
            : {
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: maxLines,
              whiteSpace: 'normal'
            })
        },

        ...props.sx
      }}
    />
  )
}

export default ToggleFocusInput
