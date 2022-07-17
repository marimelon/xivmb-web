import styled from '@emotion/styled'
import { Button, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { XIVDataCenter, XIVDataCenters } from '../@types/world'
import { AppLocationState } from '../App'
import firebase from '../Common/firebase'

const HeaderItem = styled(Button)(({ theme }) => ({
  color: 'white',
  textTransform: 'none',
}))

type LoginHeaderProps = {
  dc: XIVDataCenter
} & RouteComponentProps

export const LoginHeader = ({ dc }: LoginHeaderProps) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const history = useHistory<AppLocationState>()
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser)
  }, [])

  const login = () => {
    history.push('/login')
  }
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(
        _ => {
          setUser(null)
        },
        err => {
          console.log(err)
        }
      )
  }
  return (
    <Grid container justifyContent="flex-end">
      {XIVDataCenters.filter(v => v !== dc).map(v => (
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
        <HeaderItem sx={{ pl: 4 }} onClick={logout}>
          Logout
        </HeaderItem>
      ) : (
        <HeaderItem onClick={login}>Login</HeaderItem>
      )}
    </Grid>
  )
}

export default withRouter(LoginHeader)
