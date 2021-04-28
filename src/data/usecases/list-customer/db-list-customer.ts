import { CustomerModel } from './../../../domain/models/customer'
import { ListCustomer, ListCustomerModel } from './../../../domain/usecases/customer/list-customer'
import { ListCustomerRepository } from './../../protocols/list-customer-repository'

export class DbListCustomer implements ListCustomer {
  constructor (private readonly listCustomerRepository: ListCustomerRepository) {}

  async list (params: ListCustomerModel = {}): Promise<CustomerModel[]> {
    const customers = await this.listCustomerRepository.list(params)

    return customers
  }
}
