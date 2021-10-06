# firestore-importer

**Under development**

firestore-impoter is a package importing object data to firestore.

## Installation

```sh
 yarn add firestore-importer

```

## Usage


### ```import(data: SchemaDataObject, options?: ImportOptions)```

```ts
import importer from 'firestore-importer'

const data = {
  'users': [
    {
      id: 'manuall-user-id-1',
      name: 'user name',
      age: 20,
      user-items: {

      }
    },
  ]
}

const instance = await importer.import(data, {
  // specify sub collections. Then a nested sub collection object is imported.
  subCollections: [
    'user-items',
  ]
})

// delete all imported documents by id.
await instance.flush()

```
