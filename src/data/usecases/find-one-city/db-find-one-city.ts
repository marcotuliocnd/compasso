import { CityModel } from './../../../domain/models/city'
import { FindOneCity, FindOneCityModel } from './../../../domain/usecases/city/find-one-city'
import { FindByCityRepository } from './../../protocols/find-by-city-repository'

export class DbFindOneCity implements FindOneCity {
  constructor (private readonly findByCityRepostiory: FindByCityRepository) {}

  async findBy (params: FindOneCityModel): Promise<CityModel | null> {
    await this.findByCityRepostiory.findBy(params)
    return null
  }
}
