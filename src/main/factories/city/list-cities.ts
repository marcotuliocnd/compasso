import { CityMongoRepository } from '../../../infra/db/mongodb/city-repository/city'
import { DbListCities } from '../../../data/usecases/list-cities/db-list-cities'
import { ListCitiesController } from '../../../presentation/controllers/city/list-cities/list-cities'

export const makeListCitiesController = (): ListCitiesController => {
  const cityMongoRepository = new CityMongoRepository()
  const dbListCities = new DbListCities(cityMongoRepository)

  return new ListCitiesController(dbListCities)
}
