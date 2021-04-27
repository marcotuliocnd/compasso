import { CustomerModel } from './../../domain/models/customer'

export interface FindCustomerByIdRepository {
  findById: (id: string) => Promise<CustomerModel | null>
}
