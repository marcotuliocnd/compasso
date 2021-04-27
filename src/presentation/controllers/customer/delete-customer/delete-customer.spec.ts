import { HttpRequest, MissingParamError, DeleteCustomerController, DeleteCustomerById, ServerError } from './delete-customer-protocols'

const makeDeleteCustomerByIdStub = (): DeleteCustomerById => {
  class DeleteCustomerByIdStub implements DeleteCustomerById {
    async deleteById (id: string): Promise<boolean> {
      return true
    }
  }

  return new DeleteCustomerByIdStub()
}

interface SutTypes {
  sut: DeleteCustomerController
  deleteCustomerByIdStub: DeleteCustomerById
}

const makeSut = (): SutTypes => {
  const deleteCustomerByIdStub = makeDeleteCustomerByIdStub()
  const sut = new DeleteCustomerController(deleteCustomerByIdStub)

  return {
    sut,
    deleteCustomerByIdStub
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

  test('Should call DeleteCustomerById with the provided customerId', async () => {
    const { sut, deleteCustomerByIdStub } = makeSut()
    const deleteByIdSpy = jest.spyOn(deleteCustomerByIdStub, 'deleteById')

    const httpRequest: HttpRequest = {
      params: {
        customerId: 'any_id'
      }
    }

    await sut.handle(httpRequest)
    expect(deleteByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 500 if DeleteCustomerById throws', async () => {
    const { sut, deleteCustomerByIdStub } = makeSut()
    jest.spyOn(deleteCustomerByIdStub, 'deleteById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

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

  test('Should return 200 if success', async () => {
    const { sut } = makeSut()

    const httpRequest: HttpRequest = {
      params: {
        customerId: 'any_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      success: true
    })
  })

  test('Should return 422 if delete fails', async () => {
    const { sut, deleteCustomerByIdStub } = makeSut()
    jest.spyOn(deleteCustomerByIdStub, 'deleteById').mockReturnValueOnce(new Promise((resolve) => resolve(false)))

    const httpRequest: HttpRequest = {
      params: {
        customerId: 'any_id'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(422)
    expect(httpResponse.body).toEqual({
      success: false
    })
  })
})
