import { AddCustomerController } from './add-customer'
import { HttpRequest } from './../../../protocols/http'
import { MissingParamError } from './../../../errors/missing-param-errors'

interface SutTypes {
  sut: AddCustomerController
}

const makeSut = (): SutTypes => {
  const sut = new AddCustomerController()
  return {
    sut
  }
}

describe('AddCustomerController', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
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

  test('Should return 400 if no gender is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        age: 'any_age',
        birthdate_at: 'any_date',
        city: 'any_city'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({
      error: new MissingParamError('gender').message
    })
  })

  test('Should return 400 if no age is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        gender: 'any_gender',
        birthdate_at: 'any_date',
        city: 'any_city'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({
      error: new MissingParamError('age').message
    })
  })
})
