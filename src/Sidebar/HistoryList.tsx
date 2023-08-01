import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { firestore, get_user } from '../Common/firebase'
import style from './Favorite.module.scss'
import { FavoriteButton } from './ItemButtons/AddFavoriteButton'
import { DeleteFavoriteButton } from './ItemButtons/DeleteFavoriteButton'
import { SidebarItem } from './SidebarItem'

const removeHistory = (itemid: number) => {
  get_user().then(user => {
    if (user) {
      const docRef = doc(firestore, 'user_histories', user.uid)
      updateDoc(docRef, {
        history: arrayRemove(firestore, itemid),
      })
    }
  })
}

export type HistoryListProps = {
  onClickItem: (parent: string, itemid: number, itemname: string) => void
  activeItem?: string
  favoriteList: FavoriteItem[]
  addFavorite: (itemid: number, name?: string) => void
}

export const HistoryList = ({
  onClickItem,
  activeItem,
  favoriteList,
  addFavorite,
}: HistoryListProps) => {
  const [items, setItems] = useState<number[]>([])

  useEffect(() => {
    var unsubscribe: (() => void) | undefined = undefined
    get_user().then(user => {
      if (user) {
        const docRef = doc(firestore, 'user_histories', user.uid)
        unsubscribe = onSnapshot(docRef, doc => {
          if (doc.exists()) {
            const itemIds = doc.get('history') as number[]
            setItems(itemIds)
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
            key={value}
            itemid={value}
            name={undefined}
            onClick={_onClickItem}
            isActive={activeItem === 'history' + value}
            className={style.SidebarItem}>
            <FavoriteButton
              isActive={favoriteList.findIndex(({ id }) => id === value) !== -1}
              addFavoriteCB={() => {
                addFavorite(value, undefined)
              }}
              style={{ right: 20, top: 2 }}
            />
            <DeleteFavoriteButton
              deleteFavoriteCB={() => {
                removeHistory(value)
              }}
            />
          </SidebarItem>
        )
      })}
    </div>
  )
}
