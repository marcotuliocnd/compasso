import { CityModel } from './../../domain/models/city'
import { FindOneCityModel } from './../../domain/usecases/city/find-one-city'

export interface FindByCityRepository {
  findBy: (params: FindOneCityModel) => Promise<CityModel | null>
}
