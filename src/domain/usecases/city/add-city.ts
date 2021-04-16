import { CityModel } from '../../models/city'

export interface AddCityModel {
  name: string
  state: string
}

export interface AddCity {
  add: (city: AddCityModel) => CityModel
}
