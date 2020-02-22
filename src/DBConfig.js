export const DBConfig = {
    name: 'DigitalATM',
    version: 1,
    objectStoresMeta: [
      {
        store: 'user',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'username', keypath: 'username', options: { unique: false } },
          { name: 'password', keypath: 'password', options: { unique: false } }
        ]
      },
      {
        store: 'transactions',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'userid', keypath: 'userid'},
          { name: 'type', keypath: 'type', options: { unique: false } },
          { name: 'amount', keypath: 'amount', options: { unique: false } }
        ]
      }
    ]
  };