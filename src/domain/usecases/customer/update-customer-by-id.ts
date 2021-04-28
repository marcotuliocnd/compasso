import { CustomerModel } from './../../models/customer'

export interface UpdateCustomerByIdModel {
  name?: string
  gender?: string
  age?: string
  city?: string
  birthdate_at?: string
}

export interface UpdateCustomerById {
  update: (id: string, values: UpdateCustomerByIdModel) => Promise<CustomerModel>
}
