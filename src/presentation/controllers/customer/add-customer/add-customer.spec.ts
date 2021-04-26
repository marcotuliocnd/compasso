import {
  ServerError,
  FindOneCity, FindOneCityModel,
  CityModel,
  AddCustomerController,
  HttpRequest,
  MissingParamError,
  InvalidParamError
} from './add-customer-protocols'

interface SutTypes {
  sut: AddCustomerController
  findOneCityStub: FindOneCity
}

const makeFindOneCityStub = (): FindOneCity => {
  class FindOneCityStub implements FindOneCity {
    async findBy (params: FindOneCityModel = {}): Promise<CityModel> {
      return await new Promise(resolve => resolve({
        id: 'any_id',
        name: 'any_name',
        state: 'any_state'
      }))
    }
  }
  return new FindOneCityStub()
}

const makeSut = (): SutTypes => {
  const findOneCityStub = makeFindOneCityStub()
  const sut = new AddCustomerController(findOneCityStub)
  return {
    sut,
    findOneCityStub
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

  test('Should return 400 if no birthdate_at is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        gender: 'any_gender',
        age: 'any_age',
        city: 'any_city'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({
      error: new MissingParamError('birthdate_at').message
    })
  })

  test('Should return 400 if no city is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        gender: 'any_gender',
        age: 'any_age',
        birthdate_at: 'any_date'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({
      error: new MissingParamError('city').message
    })
  })

  test('Should call FindOneCity with correct value', async () => {
    const { sut, findOneCityStub } = makeSut()

    const findBySpy = jest.spyOn(findOneCityStub, 'findBy')

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        gender: 'any_gender',
        age: 'any_age',
        city: 'any_city',
        birthdate_at: 'any_date'
      }
    }

    await sut.handle(httpRequest)
    expect(findBySpy).toHaveBeenCalledWith({
      id: 'any_city'
    })
  })

  test('Should return 500 if FindOneCity throws', async () => {
    const { sut, findOneCityStub } = makeSut()
    jest.spyOn(findOneCityStub, 'findBy').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        gender: 'any_gender',
        age: 'any_age',
        city: 'any_city',
        birthdate_at: 'any_date'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual({
      error: new ServerError().message
    })
  })

  test('Should return 404 if FindOneCity returns null', async () => {
    const { sut, findOneCityStub } = makeSut()
    jest.spyOn(findOneCityStub, 'findBy').mockReturnValueOnce(new Promise((resolve) => resolve(null)))

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        gender: 'any_gender',
        age: 'any_age',
        city: 'any_city',
        birthdate_at: 'any_date'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toEqual({
      error: new InvalidParamError('city').message
    })
  })
})
