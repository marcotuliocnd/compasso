import { ListCitiesRepository } from './../../protocols/list-cities-repository'
import { CityModel } from './../../../domain/models/city'
import { ListCities } from '../../../domain/usecases/city/list-cities'

export class DbListCities implements ListCities {
  constructor (private readonly listCitiesRepository: ListCitiesRepository) {}

  async list (params: any = {}): Promise<CityModel[]> {
    const cities = await this.listCitiesRepository.list(params)
    return cities
  }
}
