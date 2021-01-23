import React, { useEffect, useState } from 'react'
import firebase from '../Common/firebase'
import Favorite from './Favorite'
import ItemSearch from './ItemSearch/ItemSearch'
import style from './Sidebar.module.scss'

interface Props {
  changeItem?: (itemid: number, itemname: string) => void
}

const Sidebar: React.FC<Props> = ({ changeItem }) => {
  const [favoriteList, setFavoriteList] = useState<FavoriteItem[]>([])
  const [activeItem, setActiveItem] = useState<string>()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection('user_bookmark')
          .doc(user.uid)
          .onSnapshot(doc => {
            if (doc.exists) {
              if (doc.metadata.hasPendingWrites === false) {
                setFavoriteList(doc.get('favorite'))
              }
            }
          })
      }
    })
  }, [])

  const updateFireStore = (favoriteList: FavoriteItem[]) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection('user_bookmark')
          .doc(user.uid)
          .set({ favorite: favoriteList })
      }
    })
  }

  const changeActiveItem = (parent: string, itemid: number, name: string) => {
    changeItem && changeItem(itemid, name)
    setActiveItem(parent + itemid)
  }

  const addFavorite = (itemid: number, name: string) => {
    const newlist = favoriteList.concat([{ id: itemid, name: name }])
    setFavoriteList(newlist)
    updateFireStore(newlist)
  }

  const changeFavorite = (newfavoriteList: FavoriteItem[]) => {
    setFavoriteList(newfavoriteList)
    updateFireStore(newfavoriteList)
  }

  const deleteFavorite = (itemid: number) => {
    const newfavoriteList = favoriteList.filter(elm => elm.id !== itemid)
    setFavoriteList(newfavoriteList)
    updateFireStore(newfavoriteList)
  }

  return (
    <div className={style.Sidebar}>
      <div className={style.WebTitle}>
        <div>FFXIVMarketBord</div>
      </div>
      <ItemSearch
        onClickItem={changeActiveItem}
        activeItem={activeItem}
        favoriteList={favoriteList}
        addFavoriteCB={addFavorite}
      />
      <Favorite
        favoriteList={favoriteList}
        activeItem={activeItem}
        onChange={changeFavorite}
        deleteFavoriteCB={deleteFavorite}
        onClickItem={changeActiveItem}
      />
    </div>
  )
}

export default Sidebar
