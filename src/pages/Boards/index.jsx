import { useState, useEffect } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// Grid: https://v5.mui.com/material-ui/react-grid2/
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import ListAltIcon from '@mui/icons-material/ListAlt'
import HomeIcon from '@mui/icons-material/Home'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
// import CardMedia from '@mui/material/CardMedia'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { Link, useLocation } from 'react-router-dom'
import SidebarCreateBoardModal from './create'
import { fetchBoardsAPI } from '~/apis'
import { DEFAULT_PAGE, DEFAULT_ITEMS_PER_PAGE } from '~/utils/constants'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import { styled } from '@mui/material/styles'
// Styles của mấy cái Sidebar item menu
const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  // backgroundColor: theme.palette.mode === 'dark' ? '#1C2B42' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#37373A' : '#DDDEDD'
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1C2B42' : '#e9f2ff'
  }
}))


function Boards() {
  // Số lượng bản ghi boards hiển thị tối đa trên 1 page tùy dự án (thường sẽ là 12 cái)
  const [boards, setBoards] = useState(null)
  // Tổng toàn bộ số lượng bản ghi boards có trong Database mà phía BE trả về để FE dùng tính toán phân trang
  const [totalBoards, setTotalBoards] = useState(null)

  // Trong component:
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Xử lý phân trang từ url với MUI: https://v5.mui.com/material-ui/react-pagination/
  const location = useLocation()
  /**
   * Parse chuỗi string search trong location về đối tượng URLSearchParams trong JavaScript
   * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
   */
  const query = new URLSearchParams(location.search)
  /**
   * Lấy giá trị page từ query, default sẽ là 1 nếu không tồn tại page từ url.
   * Nhắc lại kiến thức cơ bản hàm parseInt cần tham số thứ 2 là Hệ thập phân (hệ đếm cơ số 10) để đảm bảo chuẩn số cho phân trang
   */
  const page = parseInt(query.get('page') || '1', 10)

  const updateStateData = (res) => {
    setBoards(res.boards || [])
    setTotalBoards(res.totalBoards || 0)
  }

  useEffect(() => {
    // Mỗi khi cái url thay đổi vi dụ như chúng ta chuyển trang, thì cái location.search lấy từ hook useLocation của react-router-dom cũng thay đổi theo, đồng nghĩa hàm useEffect sẽ chạy lại và fetch lại API theo đúng page mới vì cái location.search đã nằm trong dependencies của useEffect
    // console.log(location.search)

    // Gọi API lấy danh sách boards ở đây...
    fetchBoardsAPI(location.search).then(updateStateData)
  }, [location.search])

  const afterCreateNewBoard = () => {
    // Đơn giản là cứ fetch lại danh sách board tương tự trong useEffect
    fetchBoardsAPI(location.search).then(updateStateData)
  }

  // Lúc chưa tồn tại boards > đang chờ gọi api thì hiện loading
  if (!boards) {
    return <PageLoadingSpinner caption="Loading Boards..." />
  }

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box sx={{ px: 2, my: 2 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={3}>
            <Stack
              direction={{ xs: 'row', sm: 'column' }} // nằm ngang trên mobile
              spacing={1}
              sx={{ overflowX: { xs: 'auto', sm: 'unset' } }}
            >
              <SidebarItem className="active">
                <SpaceDashboardIcon fontSize="small" />
                Boards
              </SidebarItem>
              <SidebarItem>
                <ListAltIcon fontSize="small" />
                Templates
              </SidebarItem>
              <SidebarItem>
                <HomeIcon fontSize="small" />
                Home
              </SidebarItem>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="column" spacing={1}>
              <SidebarCreateBoardModal afterCreateNewBoar={afterCreateNewBoard} />
            </Stack>
          </Grid>

          <Grid xs={12} sm={9} sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 140px)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>YOUR WORKSPACES</Typography>

            {/* Trường hợp gọi API nhưng không tồn tại cái board nào trong Database trả về */}
            {boards?.length === 0 &&
              <Typography variant="span" sx={{ fontWeight: 'bold', mb: 3 }}>No result found!</Typography>
            }

            {/* Trường hợp gọi API và có boards trong Database trả về thì render danh sách boards */}
            {boards?.length > 0 &&
              <Grid container spacing={2} columns={{ xs: 2, sm: 3, md: 4 }}>
                {boards.map(b =>
                  <Grid xs={1} sm={1} md={1} key={b._id}>
                    <Card sx={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: 'none',
                      transition: 'border-color .15s',
                      '&:hover': { borderColor: 'primary.main' }
                    }}>
                      {/* Accent bar thay thế box xám cũ */}
                      <Box sx={{ height: '22px', backgroundColor: (theme) => (theme.palette.mode === 'dark' ? 'rgb(143, 184, 246)' : 'rgba(0, 0, 0, 0.16)') }} />
                      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', mb: 0.5 }}
                        >
                          {b?.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', mb: 1.5, fontSize: '12px' }}
                        >
                          {b?.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {/* Badge Private/Public */}
                          <Typography
                            variant="caption"
                            sx={{
                              px: 1, py: 0.4,
                              borderRadius: '20px',
                              backgroundColor: 'action.hover',
                              color: 'text.secondary',
                              fontSize: '11px'
                            }}
                          >
                            {b?.type === 'public' ? 'Public' : 'Private'}
                          </Typography>
                          {/* Link text thay box xấu */}
                          <Box
                            component={Link}
                            to={`/boards/${b._id}`}
                            sx={{
                              display: 'flex', alignItems: 'center', gap: 0.3, fontWeight: 'bold',
                              fontSize: '12px', color: 'text.primary', textDecoration: 'none',
                              '&:hover': { color: 'text.secondary' }
                            }}
                          >
                            Open <ArrowRightIcon sx={{ fontSize: 16 }} />
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            }

            {/* Trường hợp gọi API và có totalBoards trong Database trả về thì render khu vực phân trang  */}
            {(totalBoards > 0) &&
              <Box sx={{
                mt: 'auto', // ← đẩy xuống đáy
                pt: 2,
                borderTop: '0.5px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center' // ← căn giữa thay vì flex-end
              }}>
                <Pagination
                  size={isMobile ? 'small' : 'medium'}
                  color="primary"
                  showFirstButton
                  showLastButton
                  count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                  page={page}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/boards${item.page === DEFAULT_PAGE ? '' : `?page=${item.page}`}`}
                      {...item}
                    />
                  )}
                />
              </Box>
            }
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Boards
