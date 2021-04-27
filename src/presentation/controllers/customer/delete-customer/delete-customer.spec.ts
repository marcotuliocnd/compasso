import { HttpRequest, MissingParamError, DeleteCustomerController, DeleteCustomerById } from './delete-customer-protocols'

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
})
