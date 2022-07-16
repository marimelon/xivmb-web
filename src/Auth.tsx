import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { SetupItemList } from './Common/database'
import firebase from './Common/firebase'
import { LoadingPage } from './Common/LoadingPage'

const FaildLoadErrorDialog = () => {
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        データの取得に失敗しました
      </DialogTitle>{' '}
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            window.location.reload()
          }}
        >
          Reload
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface State {
  signinCheck: boolean //ログインチェックが完了してるか
  signedIn: boolean //ログインしてるか
  initDatabase: boolean
  faildedLoad?: string
}

type Props = {
  children: React.ReactNode
}

const Auth = (props: Props) => {
  const [state, setState] = useState<State>({
    signinCheck: false, //ログインチェックが完了してるか
    signedIn: false, //ログインしてるか
    initDatabase: false,
  })

  useEffect(() => {
    //ログインしてるかどうかチェック
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setState(state => ({
          ...state,
          signinCheck: true,
          signedIn: true,
        }))
      } else {
        setState(state => ({
          ...state,
          signinCheck: true,
          signedIn: false,
        }))
      }
    })

    //データベース初期化
    SetupItemList()
      .then(result => {
        if (result === 'SUCSECC') {
          setState(state => ({ ...state, initDatabase: true }))
        } else {
          setState(state => ({ ...state, faildedLoad: 'faild' }))
        }
      })
      .catch(event => {
        console.log(event)
        setState(state => ({ ...state, faildedLoad: 'faild' }))
      })
  }, [])

  if (state.faildedLoad) {
    return <FaildLoadErrorDialog />
  }

  if (!state.signinCheck || !state.initDatabase) {
    return <LoadingPage />
  }

  if (state.signedIn) {
    return <React.Fragment>{props.children}</React.Fragment>
  }

  return <Redirect to="/signin" />
}

export default Auth
