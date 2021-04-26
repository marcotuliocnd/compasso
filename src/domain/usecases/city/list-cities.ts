import { CityModel } from '../../models/city'

export interface ListCitiesModel {
  name?: string
  state?: string
}

export interface ListCities {
  list: (params?: ListCitiesModel) => Promise<CityModel[]>
}
