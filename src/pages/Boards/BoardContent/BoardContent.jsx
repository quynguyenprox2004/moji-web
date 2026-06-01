import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import { DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event)
    const { active, over } = event

    if (active.id !== over.id) {
      // Lấy vị trí cũ (từ thằng active)
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      // Lấy vị trí mới (từ thằng over)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      // Dùng arrayMove của thằng dnd-kit để sắp xếp lại Column ban đầu
      // Code của arrayMove ở đây: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
      const dndorderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // 2 cái console.log dữ liệu này sau dùng để xử lý gọi API
      // const dndorderedColumnsIds = dndorderedColumns.map(c => c._id)
      // console.log('dndorderedColumns: ', dndorderedColumns)
      // console.log('dndorderedColumnsIds: ', dndorderedColumnsIds)

      setOrderedColumns(dndorderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.moji.boardContentHeight,
        backgroundColor: 'background.default',

        // Responsive Padding: Trên mobile (xs) thu nhỏ khoảng cách top/bottom xuống 6px để tối ưu không gian dọc
        p: { xs: '6px 0', sm: '10px 0' },

        // --- TỐI ƯU TRẢI NGHIỆM TRÊN MOBILE/TABLET ---
        // Giúp hành vi cuộn ngang (scroll) mượt mà hơn rất nhiều trên các thiết bị màn hình cảm ứng
        overflowX: 'auto',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',

        // Khóa hành vi kéo để tải lại trang (Pull-to-refresh) mặc định của trình duyệt mobile
        // Tránh việc người dùng đang vuốt các Column Trello thì vô tình làm load lại trang web
        overscrollBehavior: 'contain'
      }}>
        {/* <ListColumns columns={board?.columns} /> */}
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent