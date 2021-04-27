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

  test('Shoud throw if DeleteCustomerByIdRepository throws', async () => {
    const { sut, deleteCustomerByIdRepositoryStub } = makeSut()
    jest.spyOn(deleteCustomerByIdRepositoryStub, 'deleteById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const customerId = 'any_id'
    const promise = sut.deleteById(customerId)

    expect(promise).rejects.toThrow()
  })

  test('Shoud return true if successfully deleted', async () => {
    const { sut } = makeSut()

    const customerId = 'any_id'
    const successfullyDeleted = await sut.deleteById(customerId)

    expect(successfullyDeleted).toBe(true)
  })

  test('Shoud return false if delete fails', async () => {
    const { sut, deleteCustomerByIdRepositoryStub } = makeSut()
    jest.spyOn(deleteCustomerByIdRepositoryStub, 'deleteById').mockReturnValueOnce(new Promise((resolve) => resolve(false)))

    const customerId = 'any_id'
    const successfullyDeleted = await sut.deleteById(customerId)

    expect(successfullyDeleted).toBe(false)
  })
})
