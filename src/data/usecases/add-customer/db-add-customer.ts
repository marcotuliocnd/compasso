import { AddCustomer, AddCustomerModel, CustomerModel, AddCustomerRepository } from './db-add-customer-protocols'

export class DbAddCustomer implements AddCustomer {
  constructor (private readonly addCustomerRepository: AddCustomerRepository) {}

  async add (customerData: AddCustomerModel): Promise<CustomerModel> {
    const customer = await this.addCustomerRepository.add(customerData)
    return customer
  }
}
