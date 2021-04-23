import { CityModel } from '../../domain/models/city'

export interface ListCitiesRepository {
  list: (params?: any) => Promise<CityModel[]>
}
