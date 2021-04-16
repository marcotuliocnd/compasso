import { AddCityController } from './add-city'
import { MissingParamError } from './add-city-protocols'

interface SutTypes {
  sut: AddCityController
}

const makeSut = (): SutTypes => {
  const sut = new AddCityController()

  return {
    sut
  }
}

describe('AddCityController', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        state: 'any_state'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no state is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('state'))
  })
})
