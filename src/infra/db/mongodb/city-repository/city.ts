import { CityModel } from '../../../../domain/models/city'
import { AddCityModel } from '../../../../domain/usecases/city/add-city'
import { AddCityRepository } from '../../../../data/protocols/add-city-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class CityMongoRepository implements AddCityRepository {
  async add (cityData: AddCityModel): Promise<CityModel> {
    const cityCollection = MongoHelper.getCollection('cities')

    const result = await cityCollection.insertOne(cityData)
    const city = result.ops[0]
    const { _id, ...cityWithoutId } = city

    return Object.assign({}, cityWithoutId, { id: _id })
  }
}
