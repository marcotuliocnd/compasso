import { CustomerModel } from './../../domain/models/customer'
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
    const customerCollection = MongoHelper.getCollection('customers')
    await customerCollection.deleteMany({})
  })

  describe('AddCustomer', () => {
    test('Should return a customer on success', async () => {
      const cityCollection = MongoHelper.getCollection('cities')

      const { ops } = await cityCollection.insertOne({
        name: 'Uberlandia',
        state: 'MG'
      })

      const city = MongoHelper.map(ops[0])

      await request(app)
        .post('/v1/customers')
        .send({
          name: 'Marco Tulio',
          age: '20',
          birthdate_at: '2000-09-11',
          city: String(city.id),
          gender: 'masculino'
        })
        .expect(200)
    })
  })

  describe('ShowCustomer', () => {
    test('Should return a customer on success', async () => {
      const cityCollection = MongoHelper.getCollection('cities')
      const customerCollection = MongoHelper.getCollection('customers')

      const { ops } = await cityCollection.insertOne({
        name: 'Uberlandia',
        state: 'MG'
      })

      const city = MongoHelper.map(ops[0])

      const { ops: customerOps } = await customerCollection.insertOne({
        name: 'Marco Tulio',
        age: '20',
        birthdate_at: '2000-09-11',
        city: String(city.id),
        gender: 'masculino'
      })

      const customer: CustomerModel = MongoHelper.map(customerOps[0])

      await request(app)
        .get(`/v1/customers/${customer.id}`)
        .expect(200)
    })
  })
})
