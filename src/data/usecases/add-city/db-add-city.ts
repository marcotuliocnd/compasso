import { CityModel, AddCity, AddCityModel, AddCityRepository } from './db-add-city-protocols'

export class DbAddCity implements AddCity {
  private readonly addCityRepository: AddCityRepository

  constructor (addCityRepository: AddCityRepository) {
    this.addCityRepository = addCityRepository
  }

  async add (city: AddCityModel): Promise<CityModel> {
    const createdCity = await this.addCityRepository.add(city)
    return createdCity
  }
}
