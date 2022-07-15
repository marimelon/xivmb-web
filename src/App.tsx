import React, { useEffect, useState } from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { XIVDataCenter } from './@types/world'
import style from './App.module.css'
import firebase from './Common/firebase'
import { isDataCenter } from './Common/worlds'
import { MainView } from './MainView/MainView'
import Sidebar from './Sidebar/Sidebar'
type State = { itemid: number; itemname: string; dc: XIVDataCenter }

const App = () => {
  const history = useHistory<State>()
  const match = useRouteMatch<{ itemid: string }>()
  const search = useLocation().search
  const dc_query = new URLSearchParams(search).get('dc') ?? ''
  const itemid = Number(match.params.itemid)
  const [state, setState] = useState<State>({
    itemid: itemid,
    itemname: window.ItemList.get(Number(itemid)) ?? '??',
    dc: isDataCenter(dc_query) ? dc_query : 'Elemental',
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
      setState(prev => ({
        itemid: itemid,
        itemname: window.ItemList.get(itemid) ?? '??',
        dc: prev.dc,
      }))
    } else {
      setState(location.state)
    }
  })

  const changeItem = (itemid: number, itemname: string) => {
    history.push({
      pathname: `/${itemid}`,
      state: { itemid: itemid, itemname: itemname, dc: state.dc },
    })
  }

  if (!window.ItemList.get(itemid)) {
    return <div>Page Not Found.</div>
  }

  document.title = state.itemname

  return (
    <div className={style.App}>
      <Sidebar changeItem={changeItem} />
      <MainView
        itemid={state.itemid}
        itemname={state.itemname}
        dataCenter={state.dc}
      />
    </div>
  )
}

export default App
