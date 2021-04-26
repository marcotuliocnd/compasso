import { CustomerModel, AddCustomerModel, AddCustomerRepository, DbAddCustomer } from './db-add-customer-protocols'

const makeAddCustomerRepository = (): AddCustomerRepository => {
  class AddCustomerRepositoryStub implements AddCustomerRepository {
    async add (customerData: AddCustomerModel): Promise<CustomerModel> {
      const fakeCustomer: CustomerModel = {
        id: 'any_id',
        age: 'any_age',
        birthdate_at: 'any_date',
        city: 'any_city_id',
        gender: 'any_gender',
        name: 'any_name'
      }

      return await new Promise(resolve => resolve(fakeCustomer))
    }
  }

  return new AddCustomerRepositoryStub()
}

interface SutTypes {
  sut: DbAddCustomer
  addCustomerRepositoryStub: AddCustomerRepository
}

const makeSut = (): SutTypes => {
  const addCustomerRepositoryStub = makeAddCustomerRepository()
  const sut = new DbAddCustomer(addCustomerRepositoryStub)
  return {
    sut,
    addCustomerRepositoryStub
  }
}

describe('DbAddCustomer Usecase', () => {
  test('Shoud call AddCustomerRepository with correct values', async () => {
    const { sut, addCustomerRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addCustomerRepositoryStub, 'add')

    const customerData: AddCustomerModel = {
      age: 'any_age',
      birthdate_at: 'any_date',
      city: 'any_city_id',
      gender: 'any_gender',
      name: 'any_name'
    }

    await sut.add(customerData)

    expect(addSpy).toHaveBeenCalledWith({
      age: 'any_age',
      birthdate_at: 'any_date',
      city: 'any_city_id',
      gender: 'any_gender',
      name: 'any_name'
    })
  })

  test('Shoud throw if AddCustomerRepository throws', async () => {
    const { sut, addCustomerRepositoryStub } = makeSut()

    jest.spyOn(addCustomerRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const customerData: AddCustomerModel = {
      age: 'any_age',
      birthdate_at: 'any_date',
      city: 'any_city_id',
      gender: 'any_gender',
      name: 'any_name'
    }

    const promise = sut.add(customerData)

    expect(promise).rejects.toThrow()
  })
})
