export async function IndexedDBFunction() {
    (window as any).ItemList = {};
    const res = await fetch(`${process.env.REACT_APP_API_URL}/itemlistversion`).then(res => res.json());
    return await new Promise((resolve, reject) => {
        var dbName = 'DB';
        var storeName = "itemlist";
        var openReq = indexedDB.open(dbName, res.version);
        openReq.onupgradeneeded = (event) => {
            var db = (event.target as any).result;
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: 'id' });
            }
            fetch(`${process.env.REACT_APP_API_URL}/itemlist`)
                .then(res => res.json())
                .then(res => {
                var transaction = db.transaction(storeName, "readwrite");
                var itemStore = transaction.objectStore(storeName);
                console.log(res);
                for (const v of res) {
                    itemStore.put(v);
                    (window as any).ItemList[v.id] = v.name;
                }
            });
        };
        openReq.onsuccess = (event) => {
            var db = (event.target as any).result;
            var trans = db.transaction(storeName, 'readonly');
            var store = trans.objectStore(storeName);
            store.getAll().onsuccess = (event: any) => {
                for (const row of event.target.result) {
                    (window as any).ItemList[row.id] = row.name;
                }
                resolve(event);
            };
            console.log('db open success');
        };
        openReq.onerror = (event) => {
            reject(event);
        };
    });
}
;
