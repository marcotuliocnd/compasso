import { AddCustomer, AddCustomerModel, CustomerModel, AddCustomerRepository } from './db-add-customer-protocols'

export class DbAddCustomer implements AddCustomer {
  constructor (private readonly addCustomerRepository: AddCustomerRepository) {}

  async add (customerData: AddCustomerModel): Promise<CustomerModel> {
    await this.addCustomerRepository.add(customerData)

    return await new Promise(resolve => resolve({
      id: 'any_id',
      age: 'any_age',
      birthdate_at: 'any_date',
      city: 'any_city_id',
      gender: 'any_gender',
      name: 'any_name'
    }))
  }
}
