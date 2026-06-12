import { useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import {
  createNewColumnAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'

function ListColumns({ columns }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

  // const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  // Cập nhật hàm này để vừa đóng/mở form, vừa xóa dữ liệu cũ trong input
  const toggleOpenNewColumnForm = () => {
    setOpenNewColumnForm(!openNewColumnForm)
    setNewColumnTitle('')
  }

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter Column Title!')
      return
    }
    // Tạo dữ liệu Column để gọi API
    const newColumnData = {
      title: newColumnTitle
    }

    // Gọi API tạo mới Column và làm lại dữ liệu State Board
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Khi tạo column mới thì nó sẽ chưa có card, cần xử lý vấn đề kéo thả vào một column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cập nhật state board
    // Phía Front-end chúng ta phải tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
    // Lưu ý: cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẽ hỗ trợ trả về luôn toàn bộ Board dù đây có là api tạo Column hay Card đi chăng nữa. => Lúc này FE sẽ nhàn hơn.

    /**
     * Đoạn này dính lỗi object is not extensible bởi dù đã copy/clone ra giá tri newBoard nhưng bản chất của spread operator là Shallow Copy/Clone, nên dính phải rules Immutability trong Redux Toolkit không dùng được hàm PUSH (sửa giá trị mảng trực tiếp), cách đơn giản nhanh gọn nhất ở trường hợp này của chúng ta là Deep Copy/Clone toàn bộ cái Board cho dễ hiểu và code ngắn gọn.
     * https://redux-toolkit.js.org/usage/immer-reducers
     * Tài liệu thêm về Shallow và Deep Copy Object trong JS:
     * https://www.javascripttutorial.net/object/3-ways-to-copy-objects-in-javascript/
     */
    // const newBoard = { ...board }
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)

    /**
    * Ngoài ra cách nữa là vẫn có thể dùng array.concat thay cho push như docs của Redux Toolkit ở trên vì push như đã nói nó sẽ thay đổi giá trị màng trực tiếp, còn thằng concat thì nó merge ghép mảng lại và tạo ra một màng mới để chúng ta gán lại giá trị nên không vấn đề gì.
    */
    // const newBoard = { ...board }
    // newBoard.columns = newBoard.columns.concat([createdColumn])
    // newBoard.columnOrderIds = newBoard.columnOrderIds.concat([createdColumn._id])

    // setBoard(newBoard)
    // Cập nhật dữ liệu Board vào rong Redux Store
    dispatch(updateCurrentActiveBoard(newBoard))

    // Đóng trạng thái thêm Column mới & Clear Input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }
  /**
   * Thằng SortableContext yêu cầu items là một mảng dạng ['id-1', 'id-2'] chứ không phải [{id: 'id-1'}, {id: 'id-2'}]
   * Nếu không đúng thì vẫn kéo thả được nhưng không có animation
   * https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
   */
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        backgroundColor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',

        // Tạo khoảng đệm ở cuối trang khi cuộn ngang hết cỡ (cực kỳ quan trọng trên mobile)
        pr: { xs: 2, sm: 3 },

        // Kế thừa margin-left tinh chỉnh từ file Column.jsx
        // Giúp scrollbar bám sát lề trái hơn trên màn hình nhỏ
        '&::-webkit-scrollbar-track': {
          m: { xs: 1, sm: 2 }
        }
      }}>

        {/* Box List Columns */}
        {columns?.map(column =>
          <Column key={column._id} column={column} />
        )}

        {/* Nút thêm List mới - Đã đồng bộ kích thước Responsive với Column */}
        {!openNewColumnForm
          ? <Box sx={{
            // Đồng bộ width khít với Column (xs: 270px, sm: 300px)
            minWidth: { xs: '270px', sm: '300px' },
            maxWidth: { xs: '270px', sm: '300px' },

            // Thu gọn margin ngang trên mobile
            mx: { xs: 1, sm: 2 },

            borderRadius: '16px',
            height: 'fit-content',
            backgroundColor: 'background.columns'
          }}>
            <Button
              startIcon={<AddIcon />}
              onClick={toggleOpenNewColumnForm} // Giả định hàm mở form của bạn
              sx={{
                color: 'text.primary',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2,
                py: 1,
                textTransform: 'none', // Đảm bảo chữ không bị tự động viết hoa (UPPERCASE)
                fontSize: { xs: '0.85rem', sm: '0.9rem' }, // Responsive font-size
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#2A2C21' : '#D1D3D4')
                }
              }}
            >
              Add another list
            </Button>
          </Box>
          : <Box sx={{
            // Ép chặt kích thước chuẩn bằng chiếc Box nút bấm ở trên
            minWidth: { xs: '270px', sm: '300px' },
            maxWidth: { xs: '270px', sm: '300px' },
            mx: { xs: 1, sm: 2 },
            p: 1.5, // Thêm padding cho các phần tử bên trong thở
            borderRadius: '16px',
            height: 'fit-content',
            backgroundColor: 'background.columns', // Đồng bộ màu nền
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            {/* Ô nhập tiêu đề cho Column mới */}
            <TextField
              label="Enter list title..."
              variant="outlined"
              size="small"
              autoFocus // Tự động bật con trỏ chuột khi vừa mở form lên (Good UX)
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'text.primary' },
                '& input': { color: 'text.primary' },
                '& label.Mui-focused': { color: 'text.primary' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'text.primary' },
                  '&:hover fieldset': { borderColor: 'text.primary' },
                  '&.Mui-focused fieldset': { borderColor: 'text.primary' }
                }
              }}
            />

            {/* Cụm nút hành động bên dưới */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                className="interceptor-loading"
                onClick={addNewColumn}
                variant="contained"
                color="success" // Ép màu xanh chuẩn nút Submit hành động
                size="small"
                sx={{
                  boxShadow: 'none',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  '&:hover': { boxShadow: 'none' }
                }}
              >
                Add list
              </Button>

              {/* Nút hủy bỏ đóng form */}
              <IconButton
                size="small"
                onClick={toggleOpenNewColumnForm} // Giả định hàm đóng form của bạn
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
    </SortableContext>
  )
}

export default ListColumns