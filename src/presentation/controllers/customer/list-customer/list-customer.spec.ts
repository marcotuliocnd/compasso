import { ServerError } from './../../../errors/server-errors'
import { ListCustomerModel, ListCustomer } from './../../../../domain/usecases/customer/list-customer'
import { ListCustomerController } from './list-customer'
import { HttpRequest } from './../../../protocols/http'
import { CustomerModel } from './../../../../domain/models/customer'

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

const makeListCustomerStub = (): ListCustomer => {
  class ListCustomerStub implements ListCustomer {
    async list (params: ListCustomerModel = {}): Promise<CustomerModel[]> {
      return await new Promise(resolve => resolve(makeFakeCustomers()))
    }
  }

  return new ListCustomerStub()
}

interface SutTypes {
  sut: ListCustomerController
  listCustomerStub: ListCustomer
}

const makeSut = (): SutTypes => {
  const listCustomerStub = makeListCustomerStub()
  const sut = new ListCustomerController(listCustomerStub)
  return {
    listCustomerStub,
    sut
  }
}

describe('ListCustomerController', () => {
  test('Shoud call ListCustomer with correct values', async () => {
    const { sut, listCustomerStub } = makeSut()
    const listSpy = jest.spyOn(listCustomerStub, 'list')

    const httpRequest: HttpRequest = {
      queryParams: {
        name: 'any_name'
      }
    }

    await sut.handle(httpRequest)

    expect(listSpy).toHaveBeenCalledWith({
      name: 'any_name'
    })
  })

  test('Shoud return 500 if ListCustomer throws', async () => {
    const { sut, listCustomerStub } = makeSut()
    jest.spyOn(listCustomerStub, 'list').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpRequest: HttpRequest = {
      queryParams: {
        name: 'any_name'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual({
      error: new ServerError().message
    })
  })

  test('Shoud return 200 on success', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      queryParams: {
        name: 'any_name'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual(makeFakeCustomers())
  })
})
