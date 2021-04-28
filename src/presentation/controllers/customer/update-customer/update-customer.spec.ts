import { UpdateCustomerByIdModel, UpdateCustomerById } from './../../../../domain/usecases/customer/update-customer-by-id'
import { CustomerModel } from './../../../../domain/models/customer'
import { MissingParamError } from './../../../errors/missing-param-errors'
import { UpdateCustomerController } from './update-customer'
import { HttpRequest } from './../../../protocols/http'

const makeFakeCustomer = (): CustomerModel => ({
  id: 'any_id',
  name: 'any_name',
  age: 'any_age',
  birthdate_at: 'any_date',
  city: 'any_city',
  gender: 'any_gender'
})

const makeUpdateCustomerById = (): UpdateCustomerById => {
  class UpdateCustomerByIdStub implements UpdateCustomerById {
    async update (id: string, values: UpdateCustomerByIdModel): Promise<CustomerModel> {
      return makeFakeCustomer()
    }
  }

  return new UpdateCustomerByIdStub()
}

interface SutTypes {
  sut: UpdateCustomerController
  updateCustomerByIdStub: UpdateCustomerById
}

const makeSut = (): SutTypes => {
  const updateCustomerByIdStub = makeUpdateCustomerById()
  const sut = new UpdateCustomerController(updateCustomerByIdStub)
  return {
    sut,
    updateCustomerByIdStub
  }
}

describe('UpdateCustomerController', () => {
  test('Should return 400 if no customerId is provided', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      params: {

      },
      body: {
        name: 'any_name'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({
      error: new MissingParamError('customerId').message
    })
  })

  test('Should call UpdateCustomerById with correct values', async () => {
    const { sut, updateCustomerByIdStub } = makeSut()
    const updateSpy = jest.spyOn(updateCustomerByIdStub, 'update')

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name'
      },
      params: {
        customerId: 'any_id'
      }
    }

    await sut.handle(httpRequest)

    expect(updateSpy).toHaveBeenCalledWith('any_id', { name: 'any_name' })
  })
})
