import { DbUpdateCustomerById } from './../../../data/usecases/update-customer-by-id/db-update-customer-by-id'
import { CustomerMongoRepository } from './../../../infra/db/mongodb/customer-repository/customer'
import { DbFindOneCity } from './../../../data/usecases/find-one-city/db-find-one-city'
import { CityMongoRepository } from './../../../infra/db/mongodb/city-repository/city'
import { UpdateCustomerController } from './../../../presentation/controllers/customer/update-customer/update-customer'

export const makeUpdateCustomerController = (): UpdateCustomerController => {
  const findByCityRepository = new CityMongoRepository()
  const dbFindOneCity = new DbFindOneCity(findByCityRepository)
  const customerMongoRepository = new CustomerMongoRepository()
  const dbUpdateCustomerById = new DbUpdateCustomerById(customerMongoRepository)

  return new UpdateCustomerController(dbUpdateCustomerById, dbFindOneCity)
}
