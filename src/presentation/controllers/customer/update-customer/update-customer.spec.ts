import { InvalidParamError } from './../../../errors/invalid-param-errors'
import { notFound, serverError } from './../../../helpers/http-helper'
import { CityModel } from './../../../../domain/models/city'
import { FindOneCity, FindOneCityModel } from './../../../../domain/usecases/city/find-one-city'
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

const makeFakeCities = (): CityModel => ({
  id: 'any_id',
  name: 'any_name',
  state: 'any_state'
})

const makeUpdateCustomerById = (): UpdateCustomerById => {
  class UpdateCustomerByIdStub implements UpdateCustomerById {
    async update (id: string, values: UpdateCustomerByIdModel): Promise<CustomerModel> {
      return makeFakeCustomer()
    }
  }

  return new UpdateCustomerByIdStub()
}

const makeFindOneCity = (): FindOneCity => {
  class FindOneCityStub implements FindOneCity {
    async findBy (params: FindOneCityModel = {}): Promise<CityModel | null> {
      return makeFakeCities()
    }
  }

  return new FindOneCityStub()
}

interface SutTypes {
  sut: UpdateCustomerController
  updateCustomerByIdStub: UpdateCustomerById
  findOneCityStub: FindOneCity
}

const makeSut = (): SutTypes => {
  const updateCustomerByIdStub = makeUpdateCustomerById()
  const findOneCityStub = makeFindOneCity()
  const sut = new UpdateCustomerController(updateCustomerByIdStub, findOneCityStub)
  return {
    sut,
    updateCustomerByIdStub,
    findOneCityStub
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

  test('Should call FindOneCity if city is provided', async () => {
    const { sut, findOneCityStub } = makeSut()
    const findBySpy = jest.spyOn(findOneCityStub, 'findBy')

    const httpRequest: HttpRequest = {
      body: {
        city: 'any_city'
      },
      params: {
        customerId: 'any_id'
      }
    }

    await sut.handle(httpRequest)

    expect(findBySpy).toHaveBeenCalledWith('any_city')
  })

  test('Should not call FindOneCity if no city is provided', async () => {
    const { sut, findOneCityStub } = makeSut()
    const findBySpy = jest.spyOn(findOneCityStub, 'findBy')

    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name'
      },
      params: {
        customerId: 'any_id'
      }
    }

    await sut.handle(httpRequest)

    expect(findBySpy).not.toHaveBeenCalled()
  })

  test('Should return 404 if invalid city is provided', async () => {
    const { sut, findOneCityStub } = makeSut()
    jest.spyOn(findOneCityStub, 'findBy').mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const httpRequest: HttpRequest = {
      body: {
        city: 'invalid_city'
      },
      params: {
        customerId: 'any_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(notFound(new InvalidParamError('city')))
  })

  test('Should not pass body.id to UpdateCustomerById', async () => {
    const { sut, updateCustomerByIdStub } = makeSut()
    const updateSpy = jest.spyOn(updateCustomerByIdStub, 'update')

    const httpRequest: HttpRequest = {
      body: {
        id: 'any_id',
        name: 'any_name'
      },
      params: {
        customerId: 'any_id'
      }
    }

    await sut.handle(httpRequest)

    expect(updateSpy).toHaveBeenCalledWith('any_id', { name: 'any_name' })
  })

  test('Should return 500 if FindOneCity throws', async () => {
    const { sut, findOneCityStub } = makeSut()
    jest.spyOn(findOneCityStub, 'findBy').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpRequest: HttpRequest = {
      body: {
        city: 'any_city'
      },
      params: {
        customerId: 'any_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError())
  })

  test('Should return 500 if UpdateCustomerById throws', async () => {
    const { sut, updateCustomerByIdStub } = makeSut()
    jest.spyOn(updateCustomerByIdStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpRequest: HttpRequest = {
      body: {
        city: 'any_city'
      },
      params: {
        customerId: 'any_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError())
  })
})
