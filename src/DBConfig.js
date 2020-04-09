const DBConfig = {
    name: 'DB',
    version: 1,
    objectStoresMeta: [
      {
        store: 'itemlist',
        storeConfig: { keyPath: 'id'},
        storeSchema: []
      }
    ]
  };

export default DBConfig