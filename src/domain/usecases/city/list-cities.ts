import { CityModel } from '../../models/city'

export interface ListCities {
  list: (params?: any) => Promise<CityModel[]>
}
