import { DbListCustomer } from './db-list-customer'
import { ListCustomerRepository } from './../../protocols/list-customer-repository'
import { ListCustomerModel } from './../../../domain/usecases/customer/list-customer'
import { CustomerModel } from './../../../domain/models/customer'

const makeFakeCustomers = (): CustomerModel[] => {
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

const makeListCustomerRepositoryStub = (): ListCustomerRepository => {
  class ListCustomerRepositoryStub implements ListCustomerRepository {
    async list (params: ListCustomerModel = {}): Promise<CustomerModel[]> {
      return await new Promise(resolve => resolve(makeFakeCustomers()))
    }
  }

  return new ListCustomerRepositoryStub()
}

interface SutTypes {
  sut: DbListCustomer
  listCustomerRepositoryStub: ListCustomerRepository
}

const makeSut = (): SutTypes => {
  const listCustomerRepositoryStub = makeListCustomerRepositoryStub()
  const sut = new DbListCustomer(listCustomerRepositoryStub)
  return {
    listCustomerRepositoryStub,
    sut
  }
}

describe('DbListCustomer Usecase', () => {
  test('Should call ListCustomerRepository with correct values', async () => {
    const { sut, listCustomerRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listCustomerRepositoryStub, 'list')

    await sut.list({
      name: 'any_name'
    })

    expect(listSpy).toHaveBeenCalledWith({
      name: 'any_name'
    })
  })

  test('Should get default params value if no params is passed', async () => {
    const { sut, listCustomerRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listCustomerRepositoryStub, 'list')

    await sut.list()

    expect(listSpy).toBeCalledWith({})
  })

  test('Should throw if ListCustomerRepository throws', async () => {
    const { sut, listCustomerRepositoryStub } = makeSut()
    jest.spyOn(listCustomerRepositoryStub, 'list').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.list({
      name: 'any_name'
    })

    expect(promise).rejects.toThrow()
  })

  test('Should return a list of customers on success', async () => {
    const { sut } = makeSut()

    const customers = await sut.list({
      name: 'any_name'
    })

    expect(customers).toEqual(makeFakeCustomers())
  })
})
