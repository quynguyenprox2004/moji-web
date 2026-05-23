import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card() {
  return (
    <MuiCard sx={{
      cursor: 'pointer',
      border: '2px solid transparent', // Thêm border mặc định cùng màu nền để tránh giật layout khi hover
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset',
      width: '100%', // Tự động fill đầy theo độ rộng của Column cha (Responsive tự nhiên)
      wordBreak: 'break-word', // Tránh tình trạng text quá dài làm vỡ layout trên màn hình nhỏ

      // Hiệu ứng hover chuẩn Trello
      '&:hover': {
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgb(102, 157, 241)' : 'rgb(143, 184, 246)')
        // boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
      }

      // // Responsive: Tự động điều chỉnh margin-bottom tùy theo kích thước màn hình
      // mb: { xs: 1, sm: 1.5 }
    }}>
      <CardMedia
        sx={{
          // Responsive chiều cao ảnh: Màn hình nhỏ (xs) ảnh thấp hơn, màn hình lớn (sm trở lên) ảnh cao hơn
          height: { xs: 120, sm: 140 },
          backgroundSize: 'cover'
        }}
        image="https://scontent.fcxr1-1.fna.fbcdn.net/v/t39.30808-6/496326403_1577445289594922_4764648565341761925_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHdxueMDA8QKWI3l1mokEQ5xRW81gcH8FXFFbzWBwfwVb05XYYiYMrp2YKMNy5gXX_XMfWxxqoes2Pc1gRmjdrg&_nc_ohc=Ea_qDoZ7teoQ7kNvwE2IaiS&_nc_oc=Adpo_Vs0e0OSUVmKfZ0z4_Kqi0t0vogfH5veZor-pMT3wUjbwz5TA6mQsCMmcUi975o&_nc_zt=23&_nc_ht=scontent.fcxr1-1.fna&_nc_gid=Mc30EJneNsQNhSgCa2qD2A&_nc_ss=7a2a8&oh=00_Af7g_iYN_ua0heGm8kYzv2JU9QWEBVFmQ3sePzz0uoslKA&oe=6A176BC0"
        title="ABC"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography
          sx={{
            fontWeight: 500,
            // Responsive font-size cho tiêu đề card
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Fullstack MERN Stack
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          p: '0 4px 8px 4px',
          display: 'flex',
          flexWrap: 'wrap', // Nếu trên mobile các nút quá dài, chúng sẽ tự động xuống dòng chứ không bị tràn
          gap: 0.5
        }}
      >
        <Button size="small" startIcon={<GroupIcon />} sx={{ minWidth: 'unset', px: 1, color: 'text.primary' }}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />} sx={{ minWidth: 'unset', px: 1, color: 'text.primary' }}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />} sx={{ minWidth: 'unset', px: 1, color: 'text.primary' }}>
          10
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card