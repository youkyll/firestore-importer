# firestore-importer

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

await importer.import(data, {
  subcollections: [
    'user-items',
  ]
})

```
