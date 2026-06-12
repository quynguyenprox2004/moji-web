import React from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import ListCards from './ListCards/ListCards'
// import Typography from '@mui/material/Typography'
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
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useConfirm } from 'material-ui-confirm'
import {
  createNewCardAPI,
  deleteColumnDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'


function Column({ column }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

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

  // Card đã được sắp xếp ở component cha cao nhất (boards/_id.jsx) (V71 Fix bug quan trọng)
  const orderedCards = column.cards

  const [openNewCardForm, setOpenNewCardForm] = React.useState(false)
  // const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  // Cập nhật hàm này để kiêm luôn việc reset ô nhập Card title
  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
    setNewCardTitle('')
  }

  const [newCardTitle, setNewCardTitle] = React.useState('')

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please enter Card Title!', { position: 'bottom-right' })
      return
    }

    // Tạo dữ liệu Card để gọi API
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    // Gọi API tạo mới Card và làm lại dữ liệu State Board
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cập nhật state board
    // Phía Front-end chúng ta phải tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
    // Lưu ý: cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẽ hỗ trợ trả về luôn toàn bộ Board dù đây có là api tạo Column hay Card đi chăng nữa. => Lúc này FE sẽ nhàn hơn.

    // Tương tự hàm createNewColumn nên chỗ này dùng cloneDeep
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      // Nếu column rỗng: bản chất là đang chứa một cái Placeholder card (V37.2)
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        // Ngược lại Column đã có data thì push vào cuối mảng
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    // setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    // Đóng trạng thái thêm Card mới & Clear Input
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

  // Xử lý xóa một Column và Cards bên trong nó
  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete Column?',
      description: 'This action will permanently delete your Column and its Cards! Are you sure?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
      // buttonOrder: ['cancel', 'confirm']
    }).then(() => {
      // Update cho chuẩn dữ liệu state Board

      // Tương tự đoạn xử lý chỗ hàm moveColumns nên không ảnh hưởng Redux Toolkit Immutability gì ở đây cả.
      const newBoard = { ...board }
      newBoard.columns = newBoard.columns.filter(c => c._id !== column._id)
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)
      // setBoard(newBoard)
      dispatch(updateCurrentActiveBoard(newBoard))

      // Gọi API xử lý phía BE
      deleteColumnDetailsAPI(column._id).then(res => {
        toast.success(res?.deleteResult)
      })
    }).catch(() => { })
  }

  const onUpdateColumnTitle = (newTitle) => {
    // Gọi API update Column và xử lý dữ liệu Board trong redux
    updateColumnDetailsAPI(column._id, { title: newTitle }).then(() => {
      const newBoard = cloneDeep(board)
      const columnToUpdate = newBoard.columns.find(c => c._id === column._id)
      if (columnToUpdate) columnToUpdate.title = newTitle

      dispatch(updateCurrentActiveBoard(newBoard))
    })
  }

  // Phải bọc div ở đây vì vấn đề chiều cao của column khi kéo thả sẽ ó bug kiểu flickering
  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          display: 'flex', // <--- Thêm dòng này
          flexDirection: 'column', // <--- Thêm dòng này

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
          justifyContent: 'space-between',
          color: 'text.primary'
        }}>
          {/* <Typography variant="h6"
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
          </Typography> */}
          {/* BƯỚC 2: Bọc ToggleFocusInput vào một Box flex để nó chiếm trọn không gian trống bên trái */}
          <Box
            sx={{
              flexGrow: 1,
              minWidth: 0,
              mr: 1,
              overflow: 'hidden'
            }}
          >
            <ToggleFocusInput
              value={column?.title}
              onChangedValue={onUpdateColumnTitle}
              data-no-dnd="true"
              maxLines={2}
            />
          </Box>
          <Box>
            <Tooltip title="">
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
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem
                onClick={toggleOpenNewCardForm}
                sx={{
                  '&:hover': {
                    color: 'success.light',
                    '& .add-card-icon': { color: 'success.light' }
                  }
                }}
              >
                <ListItemIcon><AddCardIcon className="add-card-icon" fontSize="small" /></ListItemIcon>
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
              <MenuItem
                onClick={handleDeleteColumn}
                sx={{
                  '&:hover': {
                    color: 'warning.dark',
                    '& .delete-forever-icon': { color: 'warning.dark' }
                  }
                }}
              >
                <ListItemIcon><DeleteForeverIcon className="delete-forever-icon" fontSize="small" /></ListItemIcon>
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
          // Nếu đóng form thì giữ chiều cao cố định của footer, nếu mở form thì chuyển sang 'auto' để tự giãn theo nội dung
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
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                  '&:hover': {
                    boxShadow: 'none',
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2A2C21' : '#D1D3D4')
                  }
                }}
              >
                Add a card
              </Button>
              <Tooltip title="">
                <IconButton size="medium" sx={{
                  cursor: 'grab',
                  color: 'text.primary',
                  borderRadius: '5px',
                  '&:hover': {
                    boxShadow: 'none',
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2A2C21' : '#D1D3D4')
                  }
                }} >
                  <DragHandleIcon />
                </IconButton>
              </Tooltip>
            </Box>
            : <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
              {/* Ô nhập tiêu đề Card */}
              <TextField
                placeholder="Enter a title for this card..."
                variant="outlined"
                size="small"
                fullWidth
                multiline
                rows={1}
                autoFocus
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  '& label': { color: 'text.primary' },
                  '& textarea': { color: 'text.primary' }, // FIX BUG: Đổi từ 'input' thành 'textarea' để nhận đúng màu chữ khi dùng multiline
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#333639' : '#fff'),
                    '& fieldset': { borderColor: 'transparent' },
                    '&:hover fieldset': { borderColor: 'text.primary' },
                    '&.Mui-focused fieldset': { borderColor: 'text.primary' }
                  }
                }}
              />

              {/* Cụm nút hành động */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  className="interceptor-loading"
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
                  onClick={toggleOpenNewCardForm}
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