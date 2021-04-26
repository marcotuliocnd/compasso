import { FindOneCityModel } from './../../../../domain/usecases/city/find-one-city'
import { FindByCityRepository } from './../../../../data/protocols/find-by-city-repository'
import { ListCitiesModel } from '../../../../domain/usecases/city/list-cities'
import { CityModel } from '../../../../domain/models/city'
import { AddCityModel } from '../../../../domain/usecases/city/add-city'
import { AddCityRepository } from '../../../../data/protocols/add-city-repository'
import { ListCitiesRepository } from '../../../../data/protocols/list-cities-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class CityMongoRepository implements AddCityRepository, ListCitiesRepository, FindByCityRepository {
  async add (cityData: AddCityModel): Promise<CityModel> {
    const cityCollection = MongoHelper.getCollection('cities')

    const result = await cityCollection.insertOne(cityData)
    return MongoHelper.map(result.ops[0])
  }

  async list (params: ListCitiesModel = {}): Promise<CityModel[]> {
    const cityCollection = MongoHelper.getCollection('cities')

    const cities: CityModel[] = await cityCollection.find(params).toArray()
    return cities.map(el => MongoHelper.map(el))
  }

  async findBy (params: FindOneCityModel = {}): Promise<CityModel | null> {
    const cityCollection = MongoHelper.getCollection('cities')
    const mappedParams = MongoHelper.mapParams(params)
    const city: CityModel = await cityCollection.findOne(mappedParams)
    return city ? MongoHelper.map(city) : null
  }
}
