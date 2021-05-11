import React, { useEffect, useState } from 'react'
import firebase from '../Common/firebase'
import style from './Favorite.module.scss'
import { FavoriteButton } from './ItemButtons/AddFavoriteButton'
import { DeleteFavoriteButton } from './ItemButtons/DeleteFavoriteButton'
import { SidebarItem } from './SidebarItem'

const removeHistory = (itemid: number) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var ref = firebase.firestore().collection('user_histories').doc(user.uid)
      ref.update({
        history: firebase.firestore.FieldValue.arrayRemove(itemid),
      })
    }
  })
}

export type HistoryListProps = {
  onClickItem: (parent: string, itemid: number, itemname: string) => void
  activeItem?: string
  favoriteList: FavoriteItem[]
  addFavorite: (itemid: number, name: string) => void
}

export const HistoryList: React.FC<HistoryListProps> = ({
  onClickItem,
  activeItem,
  favoriteList,
  addFavorite,
}) => {
  const [items, setItems] = useState<FavoriteItem[]>([])

  useEffect(() => {
    var unsubscribe: (() => void) | undefined = undefined

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        unsubscribe = firebase
          .firestore()
          .collection('user_histories')
          .doc(user.uid)
          .onSnapshot(doc => {
            if (doc.exists) {
              const itemIds = doc.get('history') as number[]
              setItems(
                itemIds.reverse().map(value => ({
                  id: value,
                  name: window.ItemList.get(value) ?? '???',
                }))
              )
            }
          })
      }
    })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  const _onClickItem = (itemid: number, itemname: string) =>
    onClickItem('history', itemid, itemname)

  return (
    <div>
      {items.map(value => {
        return (
          <SidebarItem
            key={value.id}
            itemid={value.id}
            name={value.name}
            onClick={_onClickItem}
            isActive={activeItem === 'history' + value.id}
            className={style.SidebarItem}>
            <FavoriteButton
              isActive={
                favoriteList.findIndex(({ id }) => id === value.id) !== -1
              }
              addFavoriteCB={() => {
                addFavorite(value.id, value.name)
              }}
              style={{ right: 20, top: 2 }}
            />
            <DeleteFavoriteButton
              deleteFavoriteCB={() => {
                removeHistory(value.id)
              }}
            />
          </SidebarItem>
        )
      })}
    </div>
  )
}
