import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('City Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const cityCollection = MongoHelper.getCollection('cities')
    await cityCollection.deleteMany({})
  })

  test('Should return a city on success', async () => {
    await request(app)
      .post('/v1/cities')
      .send({
        name: 'Uberlandia',
        state: 'MG'
      })
      .expect(200)
  })
})
