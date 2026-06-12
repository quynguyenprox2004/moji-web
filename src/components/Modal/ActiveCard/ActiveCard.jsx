// import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import CancelIcon from '@mui/icons-material/Cancel'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined'
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'
import { singleFileValidator } from '~/utils/validators'
import { toast } from 'react-toastify'
import CardDescriptionMdEditor from './CardDescriptionMdEditor'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearCurrentActiveCard,
  selectCurrentActiveCard,
  updateCurrentActiveCard
} from '~/redux/activeCard/activeCardSlice'
import { updateCardDetailsAPI, deleteCardDetailsAPI } from '~/apis'
import { updateCardInBoard } from '~/redux/activeBoard/activeBoardSlice'
import { useConfirm } from 'material-ui-confirm'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice' // Bổ sung để lấy và cập nhật board
import { cloneDeep } from 'lodash'
import { styled } from '@mui/material/styles'
const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
  color: theme.palette.mode === 'dark' ? '#90caf9' : '#172b4d',
  backgroundColor: theme.palette.mode === 'dark' ? '#2f3542' : '#091e420f',
  padding: '10px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#33485D' : theme.palette.grey[300],
    '&.active': {
      color: theme.palette.mode === 'dark' ? '#000000de' : '#0c66e4',
      backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#e9f2ff'
    }
  }
}))


/**
 * Note: Modal là một low-component mà bọn MUI sử dụng bên trong những thứ như Dialog, Drawer, Menu, Popover. Ở đây dĩ nhiên chúng ta có thể sử dụng Dialog cũng không thành vấn đề gì, nhưng sẽ sử dụng Modal để dễ linh hoạt tùy biến giao diện từ con số 0 cho phù hợp với mọi nhu cầu nhé.
 */
function ActiveCard() {
  const dispatch = useDispatch()
  const activeCard = useSelector(selectCurrentActiveCard)

  // 📢 LẤY DỮ LIỆU BOARD TỪ REDUX RA ĐỂ XỬ LÝ LỌC CARD
  const board = useSelector(selectCurrentActiveBoard)
  // Không dùng biến State để check đóng mở Model nữa vì chúng ta sẽ check bên Board/_id.jsx
  // const [isOpen, setIsOpen] = useState(true)
  // const handleOpenModal = () => setIsOpen(true)

  const handleCloseModal = () => {
    // setIsOpen(false)
    dispatch(clearCurrentActiveCard())
  }

  // Func dùng chung cho các trường hợp update card title, description, cover, ...vv
  const callApiUpdateCard = async (updateData) => {
    const updatedCard = await updateCardDetailsAPI(activeCard._id, updateData)

    // B1: Cập nhật lại cái card đang active trong model hiện tại
    dispatch(updateCurrentActiveCard(updatedCard))

    // B2: Cập nhật lại cái bản ghi card trong cái activeBoard (nested data)
    dispatch(updateCardInBoard(updatedCard))

    return updatedCard
  }

  const onUpdateCardTitle = (newTitle) => {
    // Gọi API...
    callApiUpdateCard({ title: newTitle.trim() })
  }

  const onUpdateCardDescription = (newDescription) => {
    // Gọi API...
    callApiUpdateCard({ description: newDescription })
  }

  const onUploadCardCover = (event) => {
    // console.log(event.target?.files[0])
    const error = singleFileValidator(event.target?.files[0])
    if (error) {
      toast.error(error)
      return
    }
    let reqData = new FormData()
    reqData.append('cardCover', event.target?.files[0])

    // Gọi API...
    toast.promise(
      callApiUpdateCard(reqData).finally(() => event.target.value = ''),
      { pending: 'Updating...' }
    )
  }
  // Xử lý xóa Card chuẩn chỉnh
  const confirmDeleteCard = useConfirm()
  const handleDeleteCard = () => {
    confirmDeleteCard({
      title: 'Delete Card?',
      description: 'This action will permanently delete your Card! Are you sure?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    }).then(() => {
      // 1. Tạo bản sao sâu cho board để tránh lỗi read-only của Redux
      const newBoard = cloneDeep(board)

      // 2. Tìm cái Column đang chứa cái Card muốn xóa này (Dùng activeCard.columnId)
      const targetColumn = newBoard.columns.find(c => c._id === activeCard.columnId)

      if (targetColumn) {
        // Lọc bỏ Card ra khỏi mảng cards của Column đó
        targetColumn.cards = targetColumn.cards.filter(c => c._id !== activeCard._id)

        // Lọc bỏ cardId ra khỏi mảng cardOrderIds của Column đó
        targetColumn.cardOrderIds = targetColumn.cardOrderIds.filter(_id => _id !== activeCard._id)
      }

      // 3. Cập nhật lại dữ liệu Board mới vào Redux Store để giao diện bên dưới tự động mất Card
      dispatch(updateCurrentActiveBoard(newBoard))

      // 4. Gọi API xuống Backend để thực hiện xóa hẳn trong Database
      deleteCardDetailsAPI(activeCard._id).then(res => {
        toast.success(res?.deleteResult || 'Card deleted successfully!')
      })

      // 5. 🔥 QUAN TRỌNG: Tự động đóng Modal chi tiết card lại sau khi xóa thành công
      handleCloseModal()

    }).catch(() => { })
  }

  return (
    <Modal
      disableScrollLock
      open={true}
      onClose={handleCloseModal} // Sử dụng onClose trong trường hợp muốn đóng Modal bằng nút ESC hoặc click ra ngoài Modal
      sx={{ overflowY: 'auto' }}>
      <Box sx={{
        position: 'relative',
        width: { xs: '95vw', sm: '900px' }, // responsive width
        maxWidth: 900,
        bgcolor: 'white',
        boxShadow: 24,
        borderRadius: '8px',
        border: 'none',
        outline: 0,
        padding: { xs: '40px 12px 16px', sm: '40px 20px 20px' }, // giảm padding mobile
        margin: { xs: '20px auto', sm: '50px auto' }, // giảm margin top mobile
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1A2027' : '#fff'
      }}>
        <Box sx={{
          position: 'absolute',
          top: '12px',
          right: '10px',
          cursor: 'pointer'
        }}>
          <CancelIcon color="error" sx={{ '&:hover': { color: 'error.light' } }} onClick={handleCloseModal} />
        </Box>

        {activeCard?.cover &&
          <Box sx={{ mb: 4 }}>
            <Box
              component="img"
              src={activeCard?.cover}
              alt="card-cover"
              sx={{
                width: '100%',
                height: { xs: '160px', sm: '320px' }, // thấp hơn trên mobile
                borderRadius: '6px',
                objectFit: 'cover'
              }}
            />
          </Box>
        }

        <Box sx={{ mb: 1, mt: -3, pr: 2.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CreditCardIcon />

          {/* Feature 01: Xử lý tiêu đề của Card */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden'
            }}
          >
            <ToggleFocusInput
              inputFontSize='20px'
              value={activeCard?.title}
              onChangedValue={onUpdateCardTitle}
              maxLines={2}
            />
          </Box>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Left side */}
          <Grid xs={12} sm={9}>


            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SubjectRoundedIcon />
                <Typography variant="span" sx={{ fontWeight: '600', fontSize: '20px' }}>Description</Typography>
              </Box>

              {/* Feature 03: Xử lý mô tả của Card */}
              <CardDescriptionMdEditor
                cardDescriptionProp={activeCard?.description}
                handleUpdateCardDescription={onUpdateCardDescription}
              />
            </Box>


          </Grid>

          {/* Right side */}
          <Grid xs={12} sm={3}>
            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Add To Card</Typography>
            <Stack direction="column" spacing={1}>

              {/* Feature 06: Xử lý hành động cập nhật ảnh Cover của Card */}
              <SidebarItem className="active" component="label">
                <ImageOutlinedIcon fontSize="small" />
                Cover
                <VisuallyHiddenInput type="file" onChange={onUploadCardCover} />
              </SidebarItem>


            </Stack>

            <Divider sx={{ my: 2 }} />


            <Typography sx={{ fontWeight: '600', color: 'primary.main', mb: 1 }}>Actions</Typography>
            <Stack direction="column" spacing={1}>

              <SidebarItem
                onClick={handleDeleteCard}
                sx={{ '&:hover': { color: 'warning.dark' } }}>
                <ArchiveOutlinedIcon fontSize="small" />
                Remove
              </SidebarItem>

            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ActiveCard
