import { HttpRequest, MissingParamError, ShowCustomerController, CustomerModel, FindCustomerById, ServerError, InvalidParamError } from './show-customer-protocols'

const makeFindCustomerByIdStub = (): FindCustomerById => {
  class FindCustomerByIdStub implements FindCustomerById {
    async findById (id: string): Promise<CustomerModel | null> {
      return await new Promise(resolve => {
        resolve({
          id: 'any_id',
          name: 'any_name',
          age: 'any_age',
          birthdate_at: 'any_date',
          city: 'any_city',
          gender: 'any_gender'
        })
      })
    }
  }

  return new FindCustomerByIdStub()
}

interface SutTypes {
  sut: ShowCustomerController
  findCustomerByIdStub: FindCustomerById
}

const makeSut = (): SutTypes => {
  const findCustomerByIdStub = makeFindCustomerByIdStub()
  return {
    sut: new ShowCustomerController(findCustomerByIdStub),
    findCustomerByIdStub
  }
}

describe('ShowCustomerController', () => {
  test('Should return 400 if no params ID is provided', async () => {
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

  test('Should call FindCustomerById with correct id', async () => {
    const { sut, findCustomerByIdStub } = makeSut()
    const findByIdSpy = jest.spyOn(findCustomerByIdStub, 'findById')

    const httpRequest: HttpRequest = {
      params: {
        customerId: 'any_id'
      }
    }

    await sut.handle(httpRequest)
    expect(findByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 500 if FindCustomerById throws', async () => {
    const { sut, findCustomerByIdStub } = makeSut()
    jest.spyOn(findCustomerByIdStub, 'findById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpRequest: HttpRequest = {
      params: {
        customerId: 'any_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual({
      error: new ServerError().message
    })
  })

  test('Should return 200 if FindCustomerById finds a customer', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      params: {
        customerId: 'any_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'any_id',
      name: 'any_name',
      age: 'any_age',
      birthdate_at: 'any_date',
      city: 'any_city',
      gender: 'any_gender'
    })
  })

  test('Should return 404 if FindCustomerById does not find a customer', async () => {
    const { sut, findCustomerByIdStub } = makeSut()
    jest.spyOn(findCustomerByIdStub, 'findById').mockReturnValueOnce(new Promise((resolve) => resolve(null)))

    const httpRequest: HttpRequest = {
      params: {
        customerId: 'any_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toEqual({
      error: new InvalidParamError('customerId').message
    })
  })
})
