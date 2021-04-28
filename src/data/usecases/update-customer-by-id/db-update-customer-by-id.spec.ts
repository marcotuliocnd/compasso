import { DbUpdateCustomerById } from './db-update-customer-by-id'
import { UpdateCustomerByIdRepository } from './../../protocols/update-customer-by-id-repository'
import { CustomerModel } from './../../../domain/models/customer'
import { UpdateCustomerByIdModel } from './../../../domain/usecases/customer/update-customer-by-id'

const makeFakeCustomer = (): CustomerModel => ({
  id: 'any_id',
  name: 'any_name',
  age: 'any_age',
  birthdate_at: 'any_date',
  city: 'any_city',
  gender: 'any_gender'
})

const makeUpdateCustomerByIdRepositoryStub = (): UpdateCustomerByIdRepository => {
  class UpdateCustomerByIdRepositoryStub implements UpdateCustomerByIdRepository {
    async update (id: string, values: UpdateCustomerByIdModel): Promise<CustomerModel> {
      const updatedCustomer = {
        ...makeFakeCustomer(),
        ...values
      }
      return updatedCustomer
    }
  }

  return new UpdateCustomerByIdRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateCustomerById
  updateCustomerByIdRepositoryStub: UpdateCustomerByIdRepository
}

const makeSut = (): SutTypes => {
  const updateCustomerByIdRepositoryStub = makeUpdateCustomerByIdRepositoryStub()
  const sut = new DbUpdateCustomerById(updateCustomerByIdRepositoryStub)
  return {
    sut,
    updateCustomerByIdRepositoryStub
  }
}

describe('DbUpdateCustomerById Usecase', () => {
  test('Should call UpdateCustomerByIdRepository with correct values', async () => {
    const { sut, updateCustomerByIdRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateCustomerByIdRepositoryStub, 'update')

    const customerId = 'any_id'
    const params = {
      name: 'any_name'
    }

    await sut.update(customerId, params)

    expect(updateSpy).toHaveBeenCalledWith('any_id', { name: 'any_name' })
  })
})
