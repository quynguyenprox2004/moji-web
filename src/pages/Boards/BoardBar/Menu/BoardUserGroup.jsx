import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'

function BoardUserGroup({ max = 5, size = 30, fontSize = 16 }) {
  return (
    <AvatarGroup
      max={max}
      sx={{
        gap: '10px',
        flexDirection: 'row-reverse',
        '& .MuiAvatar-root': {
          width: size,
          height: size,
          fontSize: fontSize,
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          '&.MuiAvatarGroup-avatar': { bgcolor: '#a4b0be' } // Giữ cấu trúc nhuộm màu đốm số phụ (+X)
        }
      }}
    >
      {/* Cấu trúc dữ liệu lặp lại thủ công phục vụ bài học của bạn */}
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2023/05/main-avatar-circle-min-trungquandev-codetq.jpeg" />
      </Tooltip>
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2021/01/trungquandev-avatar-2021.jpg" />
      </Tooltip>
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2018/04/trungquandev-avatar.jpeg" />
      </Tooltip>
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2019/03/trungquandev-avatar-01-scaled.jpg" />
      </Tooltip>
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2017/03/aboutme.jpg" />
      </Tooltip>
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png" />
      </Tooltip>
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2023/05/main-avatar-circle-min-trungquandev-codetq.jpeg" />
      </Tooltip>
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2021/01/trungquandev-avatar-2021.jpg" />
      </Tooltip>
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2018/04/trungquandev-avatar.jpeg" />
      </Tooltip>
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2019/03/trungquandev-avatar-01-scaled.jpg" />
      </Tooltip>
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2017/03/aboutme.jpg" />
      </Tooltip>
      <Tooltip title="trungquandev">
        <Avatar alt="trungquandev" src="https://trungquandev.com/wp-content/uploads/2019/06/trungquandev-cat-avatar.png" />
      </Tooltip>
    </AvatarGroup>
  )
}

export default BoardUserGroup