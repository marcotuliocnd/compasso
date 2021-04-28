import { CustomerMongoRepository } from './../../../infra/db/mongodb/customer-repository/customer'
import { DbListCustomer } from './../../../data/usecases/list-customer/db-list-customer'
import { ListCustomerController } from './../../../presentation/controllers/customer/list-customer/list-customer'

export const makeListCustomerController = (): ListCustomerController => {
  const customerMongoRepository = new CustomerMongoRepository()
  const dbListCustomer = new DbListCustomer(customerMongoRepository)

  return new ListCustomerController(dbListCustomer)
}
