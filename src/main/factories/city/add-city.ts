import { CityMongoRepository } from '../../../infra/db/mongodb/city-repository/city'
import { DbAddCity } from '../../../data/usecases/add-city/db-add-city'
import { StateValidatorAdapter } from '../../../utils/state-validator-adapter'
import { AddCityController } from '../../../presentation/controllers/city/add-city'

export const makeAddCityController = (): AddCityController => {
  const stateValidatorAdapter = new StateValidatorAdapter()
  const addCityRepository = new CityMongoRepository()
  const dbAddCity = new DbAddCity(addCityRepository)

  return new AddCityController(stateValidatorAdapter, dbAddCity)
}
