import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router'
import firebase from '../Common/firebase'
import style from './LoginHeader.module.scss'

const LoginHeader = () => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const history = useHistory()

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
    <div className={style.LoginHeader}>
      <div
        className={style.logout}
        onClick={() => {
          user ? logout() : login()
        }}>
        {user ? 'Logout' : 'Login'}
      </div>
    </div>
  )
}

export default withRouter(LoginHeader)
