import { CityModel } from '../../../domain/models/city'
import { AddCity, AddCityModel } from '../../../domain/usecases/city/add-city'
import { AddCityRepository } from '../../protocols/add-city-repository'

export class DbAddCity implements AddCity {
  private readonly addCityRepository: AddCityRepository

  constructor (addCityRepository: AddCityRepository) {
    this.addCityRepository = addCityRepository
  }

  async add (city: AddCityModel): Promise<CityModel | null> {
    await this.addCityRepository.add(city)
    return await new Promise(resolve => resolve(null))
  }
}
