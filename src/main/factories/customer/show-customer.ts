import { DbFindCustomerById } from './../../../data/usecases/find-customer-by-id/db-find-customer-by-id'
import { CustomerMongoRepository } from './../../../infra/db/mongodb/customer-repository/customer'
import { ShowCustomerController } from './../../../presentation/controllers/customer/show-customer/show-customer'

export const makeShowCustomerController = (): ShowCustomerController => {
  const findCustomerByIdRepository = new CustomerMongoRepository()
  const dbFindCustomerById = new DbFindCustomerById(findCustomerByIdRepository)

  return new ShowCustomerController(dbFindCustomerById)
}
