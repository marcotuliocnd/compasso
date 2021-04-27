import { HttpRequest, MissingParamError, DeleteCustomerController } from './delete-customer-protocols'

interface SutTypes {
  sut: DeleteCustomerController
}

const makeSut = (): SutTypes => {
  const sut = new DeleteCustomerController()

  return {
    sut
  }
}

describe('DeleteCustomerController', () => {
  test('Should return 400 if customerId params is not provided', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      params: {
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({
      error: new MissingParamError('customerId').message
    })
  })
})
