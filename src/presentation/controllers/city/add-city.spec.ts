import { AddCityController } from './add-city'
import {
  MissingParamError,
  InvalidParamError,
  StateValidator,
  ServerError,
  AddCity,
  AddCityModel,
  CityModel
} from './add-city-protocols'

const makeStateValidator = (): StateValidator => {
  class StateValidatorStub implements StateValidator {
    isValid (state: string): boolean {
      return true
    }
  }

  return new StateValidatorStub()
}

const makeAddCity = (): AddCity => {
  class AddCityStub implements AddCity {
    async add (city: AddCityModel): Promise<CityModel> {
      const fakeCity = {
        id: 'valid_id',
        name: 'valid_name',
        state: 'valid_state'
      }
      return await new Promise(resolve => resolve(fakeCity))
    }
  }

  return new AddCityStub()
}

interface SutTypes {
  sut: AddCityController
  stateValidatorStub: StateValidator
  addCityStub: AddCity
}

const makeSut = (): SutTypes => {
  const stateValidatorStub = makeStateValidator()
  const addCityStub = makeAddCity()
  const sut = new AddCityController(stateValidatorStub, addCityStub)

  return {
    sut,
    stateValidatorStub,
    addCityStub
  }
}

describe('AddCityController', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        state: 'any_state'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({
      error: new MissingParamError('name').message
    })
  })

  test('Should return 400 if no state is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({
      error: new MissingParamError('state').message
    })
  })

  test('Should return 400 if an invalid state is provided', async () => {
    const { sut, stateValidatorStub } = makeSut()

    jest.spyOn(stateValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        state: 'invalid_state'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({
      error: new InvalidParamError('state').message
    })
  })

  test('Should call StateValidator with correct state', async () => {
    const { sut, stateValidatorStub } = makeSut()

    const isValidSpy = jest.spyOn(stateValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        state: 'any_state'
      }
    }

    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_state')
  })

  test('Should return 500 if StateValidator throws', async () => {
    const { sut, stateValidatorStub } = makeSut()

    jest.spyOn(stateValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        state: 'invalid_state'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual({
      error: new ServerError().message
    })
  })

  test('Should call AddCity with correct values', async () => {
    const { sut, addCityStub } = makeSut()

    const addSpy = jest.spyOn(addCityStub, 'add')

    const httpRequest = {
      body: {
        name: 'any_name',
        state: 'any_state'
      }
    }

    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      state: 'any_state'
    })
  })

  test('Should return 500 if AddCity throws', async () => {
    const { sut, addCityStub } = makeSut()

    jest.spyOn(addCityStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        state: 'any_state'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual({
      error: new ServerError().message
    })
  })

  test('Should return 200 if all provided are correct', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        state: 'valid_state'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      state: 'valid_state'
    })
  })
})
