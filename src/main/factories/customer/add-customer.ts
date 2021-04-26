import { DbFindOneCity } from './../../../data/usecases/find-one-city/db-find-one-city'
import { DbAddCustomer } from './../../../data/usecases/add-customer/db-add-customer'
import { CityMongoRepository } from './../../../infra/db/mongodb/city-repository/city'
import { CustomerMongoRepository } from './../../../infra/db/mongodb/customer-repository/customer'
import { AddCustomerController } from './../../../presentation/controllers/customer/add-customer/add-customer'

export const makeAddCustomerController = (): AddCustomerController => {
  const addCustomerRepository = new CustomerMongoRepository()
  const dbAddCustomer = new DbAddCustomer(addCustomerRepository)
  const findByCityRepository = new CityMongoRepository()
  const dbFindOneCity = new DbFindOneCity(findByCityRepository)

  return new AddCustomerController(dbFindOneCity, dbAddCustomer)
}
