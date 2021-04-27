import { DeleteCustomerByIdRepository } from './../../protocols/delete-customer-by-id-repository'
import { DeleteCustomerById } from './../../../domain/usecases/customer/delete-customer-by-id'

export class DbDeleteCustomerById implements DeleteCustomerById {
  constructor (private readonly deleteCustomerByIdRepository: DeleteCustomerByIdRepository) {}

  async deleteById (id: string): Promise<boolean> {
    const sucessfullyDeleted = await this.deleteCustomerByIdRepository.deleteById(id)
    return sucessfullyDeleted
  }
}
