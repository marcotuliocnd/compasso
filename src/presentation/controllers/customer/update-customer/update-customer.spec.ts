import { MissingParamError } from './../../../errors/missing-param-errors'
import { UpdateCustomerController } from './update-customer'
import { HttpRequest } from './../../../protocols/http'

interface SutTypes {
  sut: UpdateCustomerController
}

const makeSut = (): SutTypes => {
  const sut = new UpdateCustomerController()
  return {
    sut
  }
}

describe('UpdateCustomerController', () => {
  test('Should return 400 if no customerId is provided', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
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
})
