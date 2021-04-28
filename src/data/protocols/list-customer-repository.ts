import { CustomerModel } from './../../domain/models/customer'
import { ListCustomerModel } from './../../domain/usecases/customer/list-customer'

export interface ListCustomerRepository {
  list: (params: ListCustomerModel) => Promise<CustomerModel[]>
}
