import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { CityMongoRepository } from './city'

let cityCollection: Collection

const makeSut = (): CityMongoRepository => {
  return new CityMongoRepository()
}

describe('City Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    cityCollection = MongoHelper.getCollection('cities')
    await cityCollection.deleteMany({})
  })

  describe('add', () => {
    test('Should return a city on success', async () => {
      const sut = makeSut()
      const city = await sut.add({
        name: 'any_name',
        state: 'any_state'
      })

      expect(city).toBeTruthy()
      expect(city.id).toBeTruthy()
      expect(city.name).toBe('any_name')
      expect(city.state).toBe('any_state')
    })
  })

  describe('list', () => {
    test('Should return all cities if no params is passed', async () => {
      await cityCollection.insertMany([
        {
          name: 'any_name',
          state: 'any_state'
        },
        {
          name: 'other_name',
          state: 'other_state'
        }
      ])

      const sut = makeSut()
      const cities = await sut.list()

      expect(cities.length).toBe(2)
      expect(cities[0].name).toBe('any_name')
      expect(cities[1].name).toBe('other_name')
    })

    test('Should return only cities with the provided name', async () => {
      await cityCollection.insertMany([
        {
          name: 'any_name',
          state: 'any_state'
        },
        {
          name: 'other_name',
          state: 'other_state'
        }
      ])

      const sut = makeSut()
      const cities = await sut.list({
        name: 'any_name'
      })

      expect(cities.length).toBe(1)
      expect(cities[0].name).toBe('any_name')
    })

    test('Should return only cities with the provided state', async () => {
      await cityCollection.insertMany([
        {
          name: 'any_name',
          state: 'any_state'
        },
        {
          name: 'other_name',
          state: 'other_state'
        }
      ])

      const sut = makeSut()
      const cities = await sut.list({
        state: 'other_state'
      })

      expect(cities.length).toBe(1)
      expect(cities[0].state).toBe('other_state')
    })

    test('Should return empty list', async () => {
      const sut = makeSut()
      const cities = await sut.list()

      expect(cities.length).toBe(0)
    })
  })

  describe('findBy', () => {
    test('Should return one city with the provided params', async () => {
      const result = await cityCollection.insertMany([
        {
          name: 'any_name',
          state: 'any_state'
        },
        {
          name: 'other_name',
          state: 'other_state'
        }
      ])

      const sut = makeSut()
      const city = await sut.findBy({
        id: result.ops[0]._id
      })

      expect(city).toBeTruthy()
      expect(city?.id).toEqual(result.ops[0]._id)
      expect(city?.name).toBe('any_name')
      expect(city?.state).toBe('any_state')
    })

    test('Should return null if no city matches', async () => {
      await cityCollection.insertMany([
        {
          name: 'any_name',
          state: 'any_state'
        },
        {
          name: 'other_name',
          state: 'other_state'
        }
      ])

      const sut = makeSut()
      const city = await sut.findBy({
        id: 'any_id'
      })

      expect(city).toBe(null)
    })
  })
})
