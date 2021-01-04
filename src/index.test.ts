import FirestoreImporter from '.'

describe('#splitIntoSubCollections', () => {
  test('', () => {
    const [collectionData, subCollections] = FirestoreImporter.splitIntoSubCollections({
      name: 'test',
      age: 23,
      'user-toys': {
        1: {
          name: 'robot',
        },
        2: {
          name: 'mini car',
        }
      }
    }, ['user-toys'])

    expect(collectionData).toMatchObject({
      name: 'test', age: 23
    })

    expect(subCollections).toMatchObject({
      'user-toys': expect.objectContaining({
        1: { name: 'robot' }
      })
    })
  })
})