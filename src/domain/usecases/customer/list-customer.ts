import { CustomerModel } from './../../models/customer'

export interface ListCustomerModel {
  name?: string
  gender?: string
  age?: string
  city?: string
  birthdate_at?: string
}

export interface ListCustomer {
  list: (params: ListCustomerModel) => Promise<CustomerModel[]>
}
