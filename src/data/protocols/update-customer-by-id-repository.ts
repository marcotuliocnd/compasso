import { UpdateCustomerByIdModel } from './../../domain/usecases/customer/update-customer-by-id'
import { CustomerModel } from './../../domain/models/customer'

export interface UpdateCustomerByIdRepository {
  update: (id: string, values: UpdateCustomerByIdModel) => Promise<CustomerModel>
}
