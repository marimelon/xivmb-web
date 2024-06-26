import { createContext, useCallback, useEffect, useState } from 'react'

import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'

import { Item } from '../types/item'
import { fetchItemsbyId } from './fetchItembyId'
import { get_user, firestore } from './firebase'

export type FavoriteContextType = {
  items: Item[]
  add: (item: Item) => void
  delete: (itemid: number) => void
  update: (items: Item[]) => void
}

export const FavoriteContext = createContext<FavoriteContextType>({
  items: [],
  add: () => {},
  delete: () => {},
  update: () => {},
})

type FavoriteItem = {
  id: number
  name: string
}

const useFavorite = () => {
  const [items, setItems] = useState<Item[]>([])
  useEffect(() => {
    let unsubscribe: (() => void) | undefined = undefined
    get_user().then(user => {
      if (user) {
        const docRef = doc(firestore, 'user_bookmark', user.uid)
        unsubscribe = onSnapshot(docRef, doc => {
          if (doc.exists()) {
            if (doc.metadata.hasPendingWrites === false) {
              const items = doc.get('favorite') as FavoriteItem[]
              setItems(items)
            }
          }
        })
      }
    })
    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  const update = useCallback(
    (items: Item[]) => {
      setItems(items)
      get_user().then(user => {
        if (user) {
          const docRef = doc(firestore, 'user_bookmark', user.uid)
          setDoc(docRef, {
            favorite: items.map<FavoriteItem>(item => ({
              id: item.id,
              name: item.name,
            })),
          })
        }
      })
    },
    [setItems],
  )

  const add = useCallback(
    (item: Item) => {
      if (items.findIndex(v => v.id === item.id) === -1) {
        const newItems = items.concat([item])
        update(newItems)
      }
    },
    [items, update],
  )

  const _delete = useCallback(
    (itemid: number) => {
      const newItems = items.filter(item => item.id !== itemid)
      update(newItems)
    },
    [items, update],
  )

  return { items, update, add, delete: _delete } as FavoriteContextType
}

export type HistoryContextType = {
  items: Item[]
  add: (itemid: number) => void
  delete: (itemid: number) => void
}

export const HistoryContext = createContext<HistoryContextType>({
  items: [],
  add: () => {},
  delete: () => {},
})

const useViewHistory = () => {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    let unsubscribe: (() => void) | undefined = undefined
    get_user().then(user => {
      if (user) {
        const docRef = doc(firestore, 'user_histories', user.uid)
        unsubscribe = onSnapshot(docRef, doc => {
          if (doc.exists()) {
            const itemIds = doc.get('history') as number[]
            fetchItemsbyId(itemIds).then(data => {
              setItems(data.reverse())
            })
          }
        })
      }
    })

    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  const add = useCallback(async (itemid: number) => {
    const user = await get_user()
    if (user) {
      const batch = writeBatch(firestore)
      const docRef = doc(firestore, 'user_histories', user.uid)
      batch.update(docRef, {
        history: arrayRemove(itemid),
      })
      batch.update(docRef, {
        history: arrayUnion(itemid),
      })
      await batch.commit()
    }
  }, [])

  const _delete = useCallback((itemid: number) => {
    get_user().then(user => {
      if (user) {
        const docRef = doc(firestore, 'user_histories', user.uid)
        updateDoc(docRef, {
          history: arrayRemove(firestore, itemid),
        })
      }
    })
  }, [])

  return { items, add, delete: _delete } as HistoryContextType
}

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const favorite = useFavorite()
  const history = useViewHistory()

  return (
    <FavoriteContext value={favorite}>
      <HistoryContext value={history}>{children}</HistoryContext>
    </FavoriteContext>
  )
}
