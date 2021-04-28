import { UpdateCustomerByIdRepository } from './../../protocols/update-customer-by-id-repository'
import { CustomerModel } from './../../../domain/models/customer'
import { UpdateCustomerById, UpdateCustomerByIdModel } from './../../../domain/usecases/customer/update-customer-by-id'

export class DbUpdateCustomerById implements UpdateCustomerById {
  constructor (private readonly updateCustomerByIdRepository: UpdateCustomerByIdRepository) {}

  async update (id: string, values: UpdateCustomerByIdModel): Promise<CustomerModel> {
    await this.updateCustomerByIdRepository.update(id, values)

    return {
      id: 'any_id',
      name: 'any_name',
      age: 'any_age',
      birthdate_at: 'any_date',
      city: 'any_city',
      gender: 'any_gender'
    }
  }
}
