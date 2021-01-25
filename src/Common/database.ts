import { ItemListResponse } from '../@types/itemListResponse'

export const IndexedDBFunction = async () => {
  window.ItemList = new Map()
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/itemlistversion`
  ).then<{ version: number }>(res => res.json())
  return await new Promise((resolve, reject) => {
    const dbName = 'DB'
    const storeName = 'itemlist'
    const openReq = indexedDB.open(dbName, res.version)
    openReq.onupgradeneeded = event => {
      const db = (event.target as IDBRequest).result as IDBDatabase
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' })
      }
      fetch(`${process.env.REACT_APP_API_URL}/itemlist`)
        .then<ItemListResponse>(res => res.json())
        .then(res => {
          const transaction = db.transaction(storeName, 'readwrite')
          const itemStore = transaction.objectStore(storeName)
          for (const v of res) {
            itemStore.put(v)
            window.ItemList.set(v.id, v.name)
          }
        })
    }
    openReq.onsuccess = event => {
      const db = (event.target as IDBRequest).result as IDBDatabase
      const trans = db.transaction(storeName, 'readonly')
      const store = trans.objectStore(storeName)
      store.getAll().onsuccess = (event: any) => {
        for (const row of event.target.result) {
          window.ItemList.set(row.id, row.name)
        }
        resolve(event)
      }
      console.log('db open success')
    }
    openReq.onerror = event => {
      reject(event)
    }
  })
}
