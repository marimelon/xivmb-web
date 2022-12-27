import { get_itemlist, get_itemlist_version } from '../Api/get_itemlist'
const dbName = 'DB'
const storeName = 'itemlist'

export type SetupItemListResult = 'SUCSECC' | 'FAILDED_LOAD' | 'FAILDED_DB'

export const SetupItemList: () => Promise<SetupItemListResult> = async () => {
  window.ItemList = new Map()
  const version_response = await get_itemlist_version()
  const server_version = version_response.version
  const server_count = version_response.count

  // check version
  const current_version = await new Promise<number>((resolve, reject) => {
    const openReq = indexedDB.open(dbName)
    openReq.onsuccess = event => {
      resolve(openReq.result.version)
    }
    openReq.onerror = event => {
      resolve(-1)
    }
  })

  console.log(current_version)
  if (current_version === -1) {
    const itemlist = await get_itemlist()
    for (const v of itemlist) {
      window.ItemList.set(v.id, v.name)
    }
    return 'SUCSECC'
  } else if (server_version > current_version) {
    // fetch itemlist and save to indexedDB
    const itemlist = await get_itemlist()
    if (itemlist.length !== server_count) {
      return 'FAILDED_DB'
    }

    return await new Promise<SetupItemListResult>((resolve, reject) => {
      const openReq = indexedDB.open(dbName, server_version)
      openReq.onupgradeneeded = event => {
        const db = (event.target as IDBRequest).result as IDBDatabase
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id' })
        }
        const trans = (event.target as IDBRequest).transaction
        if (trans === null) {
          resolve('FAILDED_DB')
          return
        }
        const store = trans.objectStore(storeName)
        for (const v of itemlist) {
          store.put(v)
          window.ItemList.set(v.id, v.name)
        }
        resolve('SUCSECC')
      }
      openReq.onerror = event => {
        resolve('FAILDED_DB')
      }
    })
  } else {
    // import from indexedDB
    return await new Promise<SetupItemListResult>((resolve, reject) => {
      const openReq = indexedDB.open(dbName, current_version)
      openReq.onsuccess = event => {
        const db = (event.target as IDBRequest).result as IDBDatabase
        const trans = db.transaction(storeName, 'readonly')
        const store = trans.objectStore(storeName)
        store.getAll().onsuccess = (event: any) => {
          for (const row of event.target.result) {
            window.ItemList.set(row.id, row.name)
          }
          resolve('SUCSECC')
        }
      }
      openReq.onerror = event => {
        resolve('FAILDED_DB')
      }
    })
  }
}
