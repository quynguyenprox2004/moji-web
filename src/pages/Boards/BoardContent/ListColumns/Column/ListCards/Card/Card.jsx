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
        image="https://scontent.fcxr1-1.fna.fbcdn.net/v/t39.30808-6/549786711_1670676523605131_6529189988702424564_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFI90nSvdHiqxmVb3mqdP95oL9MCECjhdCgv0wIQKOF0OHTJH_t6fQfGqwpUyDlKmOqO9Un8KneBzGC18HKBwFk&_nc_ohc=kg0e2PNfJrwQ7kNvwEogtLC&_nc_oc=AdrwWJ3hXL_6jsmXBDCt1G858oqjgb2_X26INV6GIc-iprDP7niFO_taIP_j7TnIfD4&_nc_zt=23&_nc_ht=scontent.fcxr1-1.fna&_nc_gid=x5ickn4HZRR5eJ0KkxMZSg&_nc_ss=7a2a8&oh=00_Af6l8iIg4dy4Kg_UZ0kTbq5ojIahcUk66fGtH08Lv0t29g&oe=6A16811C"
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