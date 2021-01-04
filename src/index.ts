import { Firestore } from '@google-cloud/firestore'

class FirestoreImporter {
  private _app: Firestore
  private _subCollectionNames: string[]

  constructor(app: Firestore, options: any = {}) {
    this._app = app
    this._subCollectionNames = options['subCollectionNames'] || []
  }

  static init(app: Firestore) {
    return new FirestoreImporter(app)
  }

  async import(schemaData: SchemaData) {
    const batch = this._app.batch()
    for (const collectionName in schemaData) {
      const collections = schemaData[collectionName]

      for (const id in collections) {

        const [
          collectionData,
          subCollectionSchemaData
        ] = FirestoreImporter.splitIntoSubCollections(collections[id], this._subCollectionNames)

        /**
         * コレクションの作成
         */
        batch.create(this._app.doc(collectionName), collectionData)

        /**
         * サブコレクションの作成
         */
        for (const subCollectionName in subCollectionSchemaData) {
          const subCollections = subCollectionSchemaData[subCollectionName]
          for (const subCollectionId in subCollections) {
            const subCollectionData = subCollections[subCollectionId]
            batch.create(this._app.doc(`${collectionName}/${id}/${subCollectionName}/${subCollectionId}`), subCollectionData)
          }
        }
      }
    }

    return batch.commit()
  }

  static splitIntoSubCollections(
    collectionSchema: CollectionSchema,
    subCollectionNames: string[] = []
  ): [CollectionData, SubCollections] {
    let collectionData: any = {}
    let subCollections: any = {}

    Object.entries(collectionSchema).forEach(([name, value]) => {
      if (subCollectionNames.includes(name)) {
        subCollections[name] = value
        return
      }
      collectionData[name] = value
    })


    return [
      collectionData,
      subCollections
    ]
  }
}


export default FirestoreImporter

/**
 * @example
 * const schemaData = {
 *   users: {
 *     1: {
 *       name: "test taro",
 *       "user-items": {
 *       }
 *     },
 *     2: {
 *       name: "test rin",
 *       "user-items": {
 *       }
 *     }
 *   }
 * }
 */
type SchemaData = {
  [key: string]: CollectionData
}

type CollectionData = {
  [key: string]: Object
}

type CollectionSchema = {
  [key: string]: any
}

type SubCollections = {
  [key: string]: CollectionData
}