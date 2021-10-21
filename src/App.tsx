import React, { useEffect, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import style from './App.module.css'
import firebase from './Common/firebase'
import MainView from './MainView/MainView'
import Sidebar from './Sidebar/Sidebar'
type State = { itemid: number; itemname: string }

const App: React.FC = () => {
  const history = useHistory<State>()
  const match = useRouteMatch<{ itemid: string }>()
  const itemid = Number(match.params.itemid)
  const [state, setState] = useState({
    itemid: itemid,
    itemname: window.ItemList.get(Number(itemid)) ?? '??',
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        var ref = firebase
          .firestore()
          .collection('user_histories')
          .doc(user.uid)
        ref.get().then(doc => {
          const batch = firebase.firestore().batch()
          
          if (!doc.exists) {
            batch.set(ref, {
              history: [],
            })
          }

          batch.update(ref, {
            history: firebase.firestore.FieldValue.arrayRemove(itemid),
          })
          batch.update(ref, {
            history: firebase.firestore.FieldValue.arrayUnion(itemid),
          })
          batch.commit()
        })
      }
    })
  }, [itemid])

  history.listen(location => {
    if (location.state === undefined) {
      const itemid = Number(location.pathname.slice(1))
      setState({
        itemid: itemid,
        itemname: window.ItemList.get(itemid) ?? '??',
      })
    } else {
      setState(location.state)
    }
  })

  const changeItem = (itemid: number, itemname: string) => {
    history.push({
      pathname: `/${itemid}`,
      state: { itemid: itemid, itemname: itemname },
    })
  }

  if (!window.ItemList.get(itemid)) {
    return <div>Page Not Found.</div>
  }

  document.title = state.itemname

  return (
    <div className={style.App}>
      <Sidebar changeItem={changeItem} />
      <MainView itemid={state.itemid} itemname={state.itemname} />
    </div>
  )
}

export default App
