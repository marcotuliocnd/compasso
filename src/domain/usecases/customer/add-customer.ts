import { CustomerModel } from '../../models/customer'

export interface AddCustomerModel {
  name: string
  gender: string
  age: string
  city: string
  birthdate_at: string
}

export interface AddCustomer {
  add: (customer: AddCustomerModel) => Promise<CustomerModel>
}
