import { CityModel } from '../../domain/models/city'
import { AddCityModel } from '../../domain/usecases/city/add-city'

export interface AddCityRepository {
  add: (cityData: AddCityModel) => Promise<CityModel>
}
