import styled from '@emotion/styled'
import { Box, Button, Grid } from '@mui/material'
import { signOut, User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory, withRouter } from 'react-router-dom'
import { XIVDataCenter, XIVDataCenters } from './@types/world'
import { AppLocationState } from './App'
import { auth, get_user } from './Common/firebase'
const HeaderItem = styled(Button)(({ theme }) => ({
  color: 'white',
  textTransform: 'none',
}))

type MainHeaderProps = {
  currentDC: XIVDataCenter
  onMenuClick: () => void
} & RouteComponentProps

const _MainHeader = ({ currentDC, onMenuClick }: MainHeaderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const history = useHistory<AppLocationState>()
  useEffect(() => {
    get_user().then(setUser)
  }, [])

  const login = () => {
    history.push('/login')
  }
  const logout = () => {
    signOut(auth).then(
      _ => {
        setUser(null)
      },
      err => {
        console.log(err)
      }
    )
  }
  return (
    <Grid container>
      <HeaderItem sx={{ pl: 4, display: { md: 'none' } }} onClick={onMenuClick}>
        Menu
      </HeaderItem>
      <Box sx={{ flexGrow: 1 }} />
      {XIVDataCenters.filter(v => v !== currentDC).map(v => (
        <HeaderItem
          key={v}
          onClick={() => {
            const itemid = Number(history.location.pathname.slice(1))

            const state = {
              itemid: itemid,
              itemname: window.ItemList.get(itemid) ?? '??',
              dc: v,
            }
            history.replace(
              { pathname: history.location.pathname, search: '?dc=' + v },
              state
            )
          }}
        >
          <i className={'crossworld-icon'}></i>
          {v}
        </HeaderItem>
      ))}
      {user ? (
        <HeaderItem sx={{ ml: 4 }} onClick={logout}>
          Logout
        </HeaderItem>
      ) : (
        <HeaderItem onClick={login}>Login</HeaderItem>
      )}
    </Grid>
  )
}

export const MainHeader = withRouter(_MainHeader)
