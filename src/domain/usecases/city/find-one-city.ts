import { CityModel } from './../../models/city'

export interface FindOneCityModel {
  id?: string
  name?: string
  state?: string
}

export interface FindOneCity {
  findBy: (params: FindOneCityModel) => Promise<CityModel | null>
}
