import { Collection } from 'mongodb'
import { MongoHelper } from './../helpers/mongo-helper'
import { CustomerMongoRepository } from './customer'

interface SutTypes {
  sut: CustomerMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new CustomerMongoRepository()

  return {
    sut
  }
}

let customerCollection: Collection

describe('CustomerMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    customerCollection = MongoHelper.getCollection('customers')
    await customerCollection.deleteMany({})
  })

  describe('add', () => {
    test('Should return a customer on success', async () => {
      const { sut } = makeSut()
      const customer = await sut.add({
        age: 'any_age',
        birthdate_at: 'any_date',
        city: 'any_city_id',
        gender: 'any_gender',
        name: 'any_name'
      })

      expect(customer).toBeTruthy()
      expect(customer.id).toBeTruthy()
      expect(customer.name).toBe('any_name')
      expect(customer.age).toBe('any_age')
      expect(customer.birthdate_at).toBe('any_date')
      expect(customer.city).toBe('any_city_id')
      expect(customer.gender).toBe('any_gender')
    })
  })

  describe('findById', () => {
    test('Should return a customer on success', async () => {
      const result = await customerCollection.insertMany([
        {
          age: 'any_age',
          birthdate_at: 'any_date',
          city: 'any_city_id',
          gender: 'any_gender',
          name: 'any_name'
        },
        {
          age: 'other_age',
          birthdate_at: 'other_date',
          city: 'other_city_id',
          gender: 'other_gender',
          name: 'other_name'
        }
      ])

      const { sut } = makeSut()
      const customerId = result.ops[0]._id
      const customer = await sut.findById(customerId)

      expect(customer).toBeTruthy()
      expect(customer?.id).toEqual(customerId)
      expect(customer?.name).toBe('any_name')
      expect(customer?.age).toBe('any_age')
      expect(customer?.birthdate_at).toBe('any_date')
      expect(customer?.city).toBe('any_city_id')
      expect(customer?.gender).toBe('any_gender')
    })
  })
})
