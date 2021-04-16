import { AddCityController } from './add-city'
import { MissingParamError, InvalidParamError, StateValidator } from './add-city-protocols'

interface SutTypes {
  sut: AddCityController
  stateValidatorStub: StateValidator
}

const makeSut = (): SutTypes => {
  class StateValidatorStub implements StateValidator {
    isValid (state: string): boolean {
      return true
    }
  }

  const stateValidatorStub = new StateValidatorStub()
  const sut = new AddCityController(stateValidatorStub)

  return {
    sut,
    stateValidatorStub
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

  test('Should return 400 if an invalid state is provided', () => {
    const { sut, stateValidatorStub } = makeSut()

    jest.spyOn(stateValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        state: 'invalid_state'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('state'))
  })
})
