import { MongoClient, Collection, ObjectID } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection

    return Object.assign({}, collectionWithoutId, { id: _id })
  },

  mapParams (params: any): any {
    const { id, ...paramsWithoutId } = params

    if (id) {
      return Object.assign({}, paramsWithoutId, { _id: new ObjectID(id) })
    }

    return params
  },

  parseObjectId (id: string): ObjectID {
    return new ObjectID(id)
  }
}
