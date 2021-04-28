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

    test('Should return null on fail', async () => {
      await customerCollection.insertMany([
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
      const customerId = '111111111111'
      const customer = await sut.findById(customerId)

      expect(customer).not.toBeTruthy()
    })
  })

  describe('deleteById', () => {
    test('Should return true on success', async () => {
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
      const deleted = await sut.deleteById(customerId)

      const total = await customerCollection.find().count()

      expect(deleted).toBeTruthy()
      expect(total).toBe(1)
    })

    test('Should return false on fail', async () => {
      await customerCollection.insertMany([
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
      const customerId = '111111111111'
      const customer = await sut.deleteById(customerId)

      const total = await customerCollection.find().count()

      expect(customer).not.toBeTruthy()
      expect(total).toBe(2)
    })
  })

  describe('list', () => {
    test('Should return all customers if no params is passed', async () => {
      await customerCollection.insertMany([
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
      const customers = await sut.list()

      expect(customers.length).toBe(2)
      expect(customers[0].name).toBe('any_name')
      expect(customers[1].name).toBe('other_name')
    })

    test('Should return only customers with provided params', async () => {
      await customerCollection.insertMany([
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
      const customers = await sut.list({
        name: 'any_name'
      })

      expect(customers.length).toBe(1)
      expect(customers[0].name).toBe('any_name')
    })

    test('Should return null if no customers match', async () => {
      await customerCollection.insertMany([
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
      const customers = await sut.list({
        name: 'missing_name'
      })

      expect(customers.length).toBe(0)
    })
  })
})
