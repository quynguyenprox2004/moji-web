import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
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
        {columns?.map(column => <Column key={column._id} column={column} />)}

        {/* Nút thêm List mới - Đã đồng bộ kích thước Responsive với Column */}
        <Box sx={{
          // Đồng bộ width khít với Column (xs: 270px, sm: 300px)
          minWidth: { xs: '270px', sm: '300px' },
          maxWidth: { xs: '270px', sm: '300px' },

          // Thu gọn margin ngang trên mobile
          mx: { xs: 1, sm: 2 },

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
      </Box>
    </SortableContext>
  )
}

export default ListColumns