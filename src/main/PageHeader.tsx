import { Box, Button, Grid, styled } from '@mui/material'
import { useNavigate } from '@tanstack/react-router'

import { XIVDataCenters, XIVDataCenter } from '@/types/world'

import { useUser } from '../client/firebase/firebase'

const HeaderItem = styled(Button)(() => ({
  color: 'white',
  textTransform: 'none',
}))

type PageHeaderProps = {
  dc: XIVDataCenter
  onClickMenu: () => void
}

export const PageHeader = ({
  dc,
  onClickMenu: onMenuClick,
}: PageHeaderProps) => {
  const navigate = useNavigate()
  const { signOut } = useUser()
  const logout = () => {
    signOut()
  }

  return (
    <Grid container>
      <HeaderItem sx={{ pl: 4, display: { md: 'none' } }} onClick={onMenuClick}>
        Menu
      </HeaderItem>
      <Box sx={{ flexGrow: 1 }} />
      {XIVDataCenters.filter(v => v !== dc).map(v => (
        <HeaderItem
          key={v}
          onClick={() => {
            navigate({ search: { dc: v } })
          }}>
          <i className={'crossworld-icon'}></i>
          {v}
        </HeaderItem>
      ))}
      <HeaderItem sx={{ ml: 4 }} onClick={logout}>
        Logout
      </HeaderItem>
    </Grid>
  )
}
