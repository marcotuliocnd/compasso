import { CustomerModel } from './../../models/customer'

export interface FindCustomerById {
  findById: (id: string) => Promise<CustomerModel | null>
}
