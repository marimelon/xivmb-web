import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { doc, onSnapshot, setDoc } from 'firebase/firestore'

import { Item } from '@/types/item'

import { firestore, get_user } from './firebase'

type FavoriteItem = {
  id: number
  name: string
}

type FavoriteContextType = {
  items: Item[]
  setItems: (items: Item[]) => void
}
const FavoriteContext = createContext<FavoriteContextType>({
  items: [],
  setItems: () => {},
})

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    var unsubscribe: (() => void) | undefined = undefined
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

  return (
    <FavoriteContext.Provider value={{ items, setItems }}>
      {children}
    </FavoriteContext.Provider>
  )
}

export const useFavorite = () => {
  const { items, setItems } = useContext(FavoriteContext)
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
      const newItems = items.concat([item])
      update(newItems)
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

  return { items, add, delete: _delete, update }
}
