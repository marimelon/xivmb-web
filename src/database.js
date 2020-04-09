export async function IndexedDBFunction() {
    window.ItemList = {}
    const res = await fetch(`${process.env.REACT_APP_API_URL}/itemlistversion`).then(res => res.json())

    return await new Promise( (resolve, reject)=> {
        var dbName = 'DB';
        var storeName = "itemlist";
        var openReq = indexedDB.open(dbName, res.version);
        openReq.onupgradeneeded = (event) => {
            var db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id' })
            }
            fetch(`${process.env.REACT_APP_API_URL}/itemlist`)
                .then(res => res.json())
                .then(res => {
                    var transaction = db.transaction(storeName, "readwrite");
                    var itemStore = transaction.objectStore(storeName);
                    for (const v of res) {
                        itemStore.put(v);
                        window.ItemList[v.id] = v.name;
                    }
                });
        };
        openReq.onsuccess = (event) => {
            var db = event.target.result;
            var trans = db.transaction(storeName, 'readonly');
            var store = trans.objectStore(storeName);
            store.getAll().onsuccess = event => {
                for (const row of event.target.result) {
                    window.ItemList[row.id] = row.name;
                }
                resolve(event);
            };
            console.log('db open success');
            
        };
        openReq.onerror = (event) => {
            reject(event)
        };
    })
};