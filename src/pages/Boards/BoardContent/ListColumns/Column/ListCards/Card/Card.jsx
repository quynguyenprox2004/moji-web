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
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://scontent.fcxr1-1.fna.fbcdn.net/v/t39.30808-6/496326403_1577445289594922_4764648565341761925_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHdxueMDA8QKWI3l1mokEQ5xRW81gcH8FXFFbzWBwfwVb05XYYiYMrp2YKMNy5gXX_XMfWxxqoes2Pc1gRmjdrg&_nc_ohc=Ea_qDoZ7teoQ7kNvwE2IaiS&_nc_oc=Adpo_Vs0e0OSUVmKfZ0z4_Kqi0t0vogfH5veZor-pMT3wUjbwz5TA6mQsCMmcUi975o&_nc_zt=23&_nc_ht=scontent.fcxr1-1.fna&_nc_gid=Mc30EJneNsQNhSgCa2qD2A&_nc_ss=7a2a8&oh=00_Af7g_iYN_ua0heGm8kYzv2JU9QWEBVFmQ3sePzz0uoslKA&oe=6A176BC0"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Fullstack MERN Stack</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>20</Button>
        <Button size="small" startIcon={<CommentIcon />}>15</Button>
        <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card