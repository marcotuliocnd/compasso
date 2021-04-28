import { CustomerMongoRepository } from './../../../infra/db/mongodb/customer-repository/customer'
import { DbDeleteCustomerById } from './../../../data/usecases/delete-customer-by-id/db-delete-customer-by-id'
import { DeleteCustomerController } from './../../../presentation/controllers/customer/delete-customer/delete-customer'

export const makeDeleteCustomerController = (): DeleteCustomerController => {
  const customerMongoRepository = new CustomerMongoRepository()
  const dbDeleteCustomerById = new DbDeleteCustomerById(customerMongoRepository)

  return new DeleteCustomerController(dbDeleteCustomerById)
}
