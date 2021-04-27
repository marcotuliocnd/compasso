import { DbDeleteCustomerById } from './db-delete-customer-by-id'
import { DeleteCustomerByIdRepository } from './../../protocols/delete-customer-by-id-repository'

const makeDeleteCustomerByIdRepositoryStub = (): DeleteCustomerByIdRepository => {
  class DeleteCustomerByIdRepositoryStub implements DeleteCustomerByIdRepository {
    async deleteById (id: string): Promise<boolean> {
      return true
    }
  }

  return new DeleteCustomerByIdRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteCustomerById
  deleteCustomerByIdRepositoryStub: DeleteCustomerByIdRepository
}

const makeSut = (): SutTypes => {
  const deleteCustomerByIdRepositoryStub = makeDeleteCustomerByIdRepositoryStub()
  const sut = new DbDeleteCustomerById(deleteCustomerByIdRepositoryStub)

  return {
    sut,
    deleteCustomerByIdRepositoryStub
  }
}

describe('DbDeleteCustomerById Usecase', () => {
  test('Shoud call DeleteCustomerByIdRepository with correct values', async () => {
    const { sut, deleteCustomerByIdRepositoryStub } = makeSut()
    const deleteByIdSpy = jest.spyOn(deleteCustomerByIdRepositoryStub, 'deleteById')

    const customerId = 'any_id'
    await sut.deleteById(customerId)

    expect(deleteByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
