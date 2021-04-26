import { ListCitiesModel } from '../../domain/usecases/city/list-cities'
import { CityModel } from '../../domain/models/city'

export interface ListCitiesRepository {
  list: (params?: ListCitiesModel) => Promise<CityModel[]>
}
