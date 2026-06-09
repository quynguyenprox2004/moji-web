import { useState } from 'react'
import CreateBoardModal from '~/components/Modal/CreateBoardModal'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import Box from '@mui/material/Box'

import { styled } from '@mui/material/styles'
const SidebarItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: '12px 16px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#37373A' : '#DDDEDD'
  },
  '&.active': {
    color: theme.palette.mode === 'dark' ? '#90caf9' : '#0c66e4',
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#e9f2ff'
  }
}))

function SidebarCreateBoardModal({ afterCreateNewBoard }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <SidebarItem onClick={() => setIsOpen(true)}>
        <LibraryAddIcon fontSize="small" />
        Create a new board
      </SidebarItem>

      <CreateBoardModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        afterCreateNewBoard={afterCreateNewBoard}
      />
    </>
  )
}

export default SidebarCreateBoardModal