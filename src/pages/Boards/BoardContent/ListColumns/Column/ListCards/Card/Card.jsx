import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: card._id, data: { ...card } })
  const dndKitCardStyles = {
    // touchAction: 'none', // Dành cho sensor default dạng PointerSensor
    // Nếu sử dụng CSS.Transform như docs sẽ lỗi kiểu stretch
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined
  }

  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }

  return (
    <MuiCard
      ref={setNodeRef} style={dndKitCardStyles} {...attributes} {...listeners}
      sx={{
        cursor: 'pointer',
        border: '2px solid transparent', // Thêm border mặc định cùng màu nền để tránh giật layout khi hover
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
        width: '100%', // Tự động fill đầy theo độ rộng của Column cha (Responsive tự nhiên)
        wordBreak: 'break-word', // Tránh tình trạng text quá dài làm vỡ layout trên màn hình nhỏ
        '&:hover': {
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgb(102, 157, 241)' : 'rgb(143, 184, 246)')
          // boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
        }
      }}>
      {card?.cover &&
        <CardMedia
          sx={{
            // Responsive chiều cao ảnh: Màn hình nhỏ (xs) ảnh thấp hơn, màn hình lớn (sm trở lên) ảnh cao hơn
            height: { xs: 120, sm: 140 },
            backgroundSize: 'cover'
          }}
          image={card?.cover}
        />
      }

      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography
          sx={{
            // Responsive font-size cho tiêu đề card
            fontSize: { xs: '0.875rem', sm: '1rem' },
            color: 'text.secondary'
          }}
        >
          {card?.title}
        </Typography>
      </CardContent>
      {shouldShowCardActions() &&
        <CardActions
          sx={{
            p: '0 4px 8px 4px',
            display: 'flex',
            flexWrap: 'wrap', // Nếu trên mobile các nút quá dài, chúng sẽ tự động xuống dòng chứ không bị tràn
            gap: 0.5
          }}
        >
          {!!card?.memberIds?.length &&
            <Button size="small" startIcon={<GroupIcon />} sx={{ minWidth: 'unset', color: 'text.secondary' }}>
              {card?.memberIds?.length}
            </Button>
          }
          {!!card?.comments?.length &&
            <Button size="small" startIcon={<CommentIcon />} sx={{ minWidth: 'unset', color: 'text.secondary' }}>
              {card?.comments?.length}
            </Button>
          }
          {!!card?.attachments?.length &&
            <Button size="small" startIcon={<AttachmentIcon />} sx={{ minWidth: 'unset', color: 'text.secondary' }}>
              {card?.attachments?.length}
            </Button>
          }

        </CardActions>
      }

    </MuiCard>
  )
}

export default Card