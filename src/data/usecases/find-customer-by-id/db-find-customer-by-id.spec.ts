import { FindCustomerByIdRepository, CustomerModel, DbFindCustomerById } from './db-find-customer-by-id-protocols'

const makeFakeCustomer = (): CustomerModel => ({
  id: 'any_id',
  name: 'any_name',
  age: 'any_age',
  birthdate_at: 'any_date',
  city: 'any_city',
  gender: 'any_gender'
})

const makeFindCustomerByIdRepositoryStub = (): FindCustomerByIdRepository => {
  class FindCustomerByIdRepositoryStub implements FindCustomerByIdRepository {
    async findById (id: string): Promise<CustomerModel | null> {
      return await new Promise(resolve => {
        resolve(makeFakeCustomer())
      })
    }
  }

  return new FindCustomerByIdRepositoryStub()
}

interface SutTypes {
  sut: DbFindCustomerById
  findCustomerByIdRepositoryStub: FindCustomerByIdRepository
}

const makeSut = (): SutTypes => {
  const findCustomerByIdRepositoryStub = makeFindCustomerByIdRepositoryStub()
  const sut = new DbFindCustomerById(findCustomerByIdRepositoryStub)

  return {
    sut,
    findCustomerByIdRepositoryStub
  }
}

describe('DbFindCustomerById Usecase', () => {
  test('Shoud call FindCustomerByIdRepository with correct values', async () => {
    const { sut, findCustomerByIdRepositoryStub } = makeSut()
    const findByIdSpy = jest.spyOn(findCustomerByIdRepositoryStub, 'findById')

    const costumerId = 'any_id'
    await sut.findById(costumerId)

    expect(findByIdSpy).toHaveBeenCalledWith('any_id')
  })
})
