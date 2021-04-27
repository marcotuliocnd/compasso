import { HttpRequest, MissingParamError, ShowCustomerController } from './show-customer-protocols'

interface SutTypes {
  sut: ShowCustomerController
}

const makeSut = (): SutTypes => {
  return {
    sut: new ShowCustomerController()
  }
}

describe('ShowCustomerController', () => {
  test('Should return 400 if no params ID is provided', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      params: {
        customerId: 'any_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({
      error: new MissingParamError('customerId').message
    })
  })
})
