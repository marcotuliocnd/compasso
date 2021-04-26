import { MongoHelper } from '../helpers/mongo-helper'
import { CityMongoRepository } from './city'

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
    const cityCollection = MongoHelper.getCollection('cities')
    await cityCollection.deleteMany({})
  })

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

  test('Should return all cities if no params is passed', async () => {
    const cityCollection = MongoHelper.getCollection('cities')
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
    const cityCollection = MongoHelper.getCollection('cities')
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
})
