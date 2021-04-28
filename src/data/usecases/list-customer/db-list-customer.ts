import { CustomerModel } from './../../../domain/models/customer'
import { ListCustomer, ListCustomerModel } from './../../../domain/usecases/customer/list-customer'
import { ListCustomerRepository } from './../../protocols/list-customer-repository'

export class DbListCustomer implements ListCustomer {
  constructor (private readonly listCustomerRepository: ListCustomerRepository) {}

  async list (params: ListCustomerModel = {}): Promise<CustomerModel[]> {
    await this.listCustomerRepository.list(params)

    return [{
      id: 'any_id',
      age: 'any_age',
      birthdate_at: 'any_date',
      city: 'any_city',
      gender: 'any_gender',
      name: 'any_name'
    }, {
      id: 'other_id',
      age: 'other_age',
      birthdate_at: 'other_date',
      city: 'other_city',
      gender: 'other_gender',
      name: 'other_name'
    }]
  }
}
