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
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'


function Column({ column }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: column._id, data: { ...column } })
  const dndKitColumnStyles = {
    // touchAction: 'none', // Dành cho sensor default dạng PointerSensor
    // Nếu sử dụng CSS.Transform như docs sẽ lỗi kiểu stretch
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition,
    // Chiều cao phải luôn max 100% vì nếu không sẽ lỗi lúc kéo column ngắn qua một cái column dài thì phải kéo ở khu vực giữa rất khó chịu. Lưu ý lúc này phải kết hợp với {...listeners} nằm ở Box chứ không phải ở div ngoài cùng để tránh trường hợp kéo vào vùng xanh.
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')


  const [openNewCardForm, setOpenNewCardForm] = React.useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const [newCardTitle, setNewCardTitle] = React.useState('')

  const addNewCard = () => {
    if (!newCardTitle) {
      // console.error('Please enter Card Title!')
      return
    }
    // console.log(newCardTitle)
    // Gọi API ở đây...

    // Đóng trạng thái thêm Card mới & Clear Input
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

  // Phải bọc div ở đây vì vấn đề chiều cao của column khi kéo thả sẽ ó bug kiểu flickering
  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          // Responsive Width: Trên mobile (xs) thu hẹp lại một chút để không bị kích màn hình, sm trở lên đạt kích thước chuẩn Trello
          minWidth: { xs: '270px', sm: '300px' },
          maxWidth: { xs: '270px', sm: '300px' },

          backgroundColor: 'background.columns',

          // Responsive Margin Left: Giảm khoảng cách giữa các column trên mobile để tiết kiệm không gian
          ml: { xs: 1, sm: 2 },

          borderRadius: '16px',
          height: 'fit-content',

          // Responsive Max Height: Trên mobile (xs) trừ 2 (16px), trên desktop (md) trừ 5 (40px)
          maxHeight: (theme) => ({
            xs: `calc(${theme.moji.boardContentHeight} - ${theme.spacing(2)})`, // Mobile dài hơn
            md: `calc(${theme.moji.boardContentHeight} - ${theme.spacing(5)})` // Desktop ngắn lại tí
          })
        }}>

        {/* Box Column Header */}
        <Box sx={{
          height: (theme) => theme.moji.columnHeaderHeight,
          p: '10px 5px',
          mx: '5px',
          display: 'flex',
          alignItems: 'center',
          // justifyContent: 'space-between',
          color: 'text.primary'
        }}>
          <Typography variant="h6"
            sx={{
              // Responsive FontSize cho tiêu đề Column
              fontSize: { xs: '0.9rem', sm: '1rem' },

              color: 'text.primary',
              fontWeight: 'bold',
              cursor: 'pointer',
              flexGrow: 1
              // bgcolor: 'rgba(0,0,0,0.3)' // đang test
            }}>
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title="List actions">
              <IconButton
                sx={{
                  color: 'text.primary',
                  // cursor: 'pointer',
                  borderRadius: '5px',
                  // p: '0',
                  '&:hover': {
                    boxShadow: 'none',
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2A2C21' : '#D1D3D4')
                  }
                }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
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

        {/* Box List Cards */}
        {/* <ListCards cards={column?.cards} /> */}
        <ListCards cards={orderedCards} />

        {/* Box Column Footer */}
        <Box sx={{
          // FIX QUAN TRỌNG: Nếu đóng form thì giữ chiều cao cố định của footer, nếu mở form thì chuyển sang 'auto' để tự giãn theo nội dung
          height: !openNewCardForm ? (theme) => theme.moji.columnFooterHeight : 'auto',
          p: '10px 5px',
          mx: '5px',
          display: 'flex',
          alignItems: 'center',
          color: 'text.primary'
        }}>
          {!openNewCardForm
            ? <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Button
                size="medium"
                startIcon={<AddIcon />}
                onClick={toggleOpenNewCardForm}
                sx={{
                  color: 'text.primary',
                  flexGrow: 1,
                  justifyContent: 'flex-start',
                  textTransform: 'none',

                  // Responsive font size cho nút bấm dưới chân Column
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },

                  '&:hover': {
                    boxShadow: 'none',
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2A2C21' : '#D1D3D4')
                  }
                }}
              >
                Add a card
              </Button>
              <Tooltip title="Drag to move">
                <IconButton size="medium" sx={{
                  color: 'text.primary',
                  borderRadius: '5px',
                  '&:hover': {
                    boxShadow: 'none',
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2A2C21' : '#D1D3D4')
                  }
                }} >
                  <DragHandleIcon sx={{ cursor: 'grab' }} />
                </IconButton>
              </Tooltip>
            </Box>
            : <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
              {/* Ô nhập tiêu đề Card: Sử dụng multiline giống hệt Trello để viết được tiêu đề dài */}
              <TextField
                placeholder="Enter a title for this card..."
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={2} // Mặc định hiển thị 2 dòng nhập liệu cho rộng rãi
                autoFocus // Tự động lấy con trỏ chuột khi mở form
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': { color: 'text.primary' },
                  '& .MuiOutlinedInput-root': {
                    // Đổi màu nền ô nhập giống hình dáng của một chiếc Card thực sự (Trắng ở Light Mode / Xám ở Dark Mode)
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333639' : '#fff'),
                    '& fieldset': { borderColor: 'transparent' }, // Ẩn viền thô mặc định đi cho giống Trello
                    '&:hover fieldset': { borderColor: 'text.primary' },
                    '&.Mui-focused fieldset': { borderColor: 'text.primary' }
                  }
                }}
              />

              {/* Cụm nút hành động */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  onClick={addNewCard}
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': { boxShadow: 'none' }
                  }}
                >
                  Add card
                </Button>

                <IconButton
                  size="small"
                  onClick={toggleOpenNewCardForm} // Bấm nút X để đóng form
                  sx={{
                    color: 'text.primary',
                    borderRadius: '5px',
                    '&:hover': {
                      backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2A2C21' : '#D1D3D4')
                    }
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column