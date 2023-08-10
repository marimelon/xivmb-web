import { useEffect, useState } from 'react'
import { get_user, firestore } from './firebase'
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'

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
  const [items, setItems] = useState<number[]>([])

  useEffect(() => {
    let unsubscribe: (() => void) | undefined = undefined
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

  return { items, remove: removeHistory }
}
