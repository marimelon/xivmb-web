import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { IndexedDBFunction } from './Common/database'
import firebase from './Common/firebase'
import LoadingPage from './Common/LoadingPage'

interface State {
  signinCheck: boolean //ログインチェックが完了してるか
  signedIn: boolean //ログインしてるか
  initDatabase: boolean
}

const Auth: React.FC<{}> = props => {
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
    IndexedDBFunction()
      .then(event => {
        setState(state => ({ ...state, initDatabase: true }))
      })
      .catch(event => {
        alert('Database error: ' + event.target.errorCode)
      })
  }, [])

  //チェックが終わってないなら（ローディング表示）
  if (!state.signinCheck || !state.initDatabase) {
    return <LoadingPage />
  }

  //チェックが終わりかつ
  if (state.signedIn) {
    //サインインしてるとき（そのまま表示）
    return <React.Fragment>{props.children}</React.Fragment>
  }

  return <Redirect to="/signin" />
}

export default Auth
