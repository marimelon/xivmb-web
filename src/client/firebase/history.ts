import { useEffect, useState } from 'react'

import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'

import { get_itemsinfo, itemInfo } from '../api/get_iteminfo'
import { get_user, firestore } from './firebase'

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

export const useViewHistory = () => {
  const [items, setItems] = useState<itemInfo[]>([])

  useEffect(() => {
    let unsubscribe: (() => void) | undefined = undefined
    get_user().then(user => {
      if (user) {
        const docRef = doc(firestore, 'user_histories', user.uid)
        unsubscribe = onSnapshot(docRef, doc => {
          if (doc.exists()) {
            const itemIds = doc.get('history') as number[]
            get_itemsinfo(itemIds).then(data => {
              setItems(data)
            })
          }
        })
      }
    })

    return () => {
      unsubscribe && unsubscribe()
    }
  }, [])

  return { items, remove: removeHistory }
}
