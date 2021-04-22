import { MongoHelper } from '../helpers/mongo-helper'
import { CityMongoRepository } from './city'

describe('City Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL ?? '')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return a city on success', async () => {
    const sut = new CityMongoRepository()
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
