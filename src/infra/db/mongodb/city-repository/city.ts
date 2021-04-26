import { CityModel } from '../../../../domain/models/city'
import { AddCityModel } from '../../../../domain/usecases/city/add-city'
import { AddCityRepository } from '../../../../data/protocols/add-city-repository'
import { ListCitiesRepository } from '../../../../data/protocols/list-cities-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class CityMongoRepository implements AddCityRepository, ListCitiesRepository {
  async add (cityData: AddCityModel): Promise<CityModel> {
    const cityCollection = MongoHelper.getCollection('cities')

    const result = await cityCollection.insertOne(cityData)
    return MongoHelper.map(result.ops[0])
  }

  async list (params = {}): Promise<CityModel[]> {
    const cityCollection = MongoHelper.getCollection('cities')

    const cities: CityModel[] = await cityCollection.find(params).toArray()
    return cities.map(el => MongoHelper.map(el))
  }
}
