import { FindCustomerById, CustomerModel, FindCustomerByIdRepository } from './db-find-customer-by-id-protocols'

export class DbFindCustomerById implements FindCustomerById {
  constructor (private readonly findCustomerByIdRepository: FindCustomerByIdRepository) {}

  async findById (id: string): Promise<CustomerModel | null> {
    await this.findCustomerByIdRepository.findById(id)
    return null
  }
}
