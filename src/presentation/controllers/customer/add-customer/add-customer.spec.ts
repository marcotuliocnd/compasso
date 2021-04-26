import { AddCustomerController } from './add-customer'
import { HttpRequest } from './../../../protocols/http'
import { MissingParamError } from './../../../errors/missing-param-errors'

describe('AddCustomerController', () => {
  test('Should return 400 if no name is provided', async () => {
    const sut = new AddCustomerController()
    const httpRequest: HttpRequest = {
      body: {
        gender: 'any_gender',
        age: 'any_age',
        birthdate_at: 'any_date',
        city: 'any_city'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({
      error: new MissingParamError('name').message
    })
  })
})
