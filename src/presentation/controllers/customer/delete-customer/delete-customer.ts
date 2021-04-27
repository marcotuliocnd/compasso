import { Controller, HttpRequest, HttpResponse, badRequest, MissingParamError, DeleteCustomerById, serverError, ok, unprocessableEntity } from './delete-customer-protocols'

export class DeleteCustomerController implements Controller {
  constructor (private readonly deleteCustomerById: DeleteCustomerById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.customerId) {
        return badRequest(new MissingParamError('customerId'))
      }

      const successfullyDeleted = await this.deleteCustomerById.deleteById(httpRequest.params.customerId)
      if (!successfullyDeleted) {
        return unprocessableEntity({ success: false })
      }

      return ok({ success: successfullyDeleted })
    } catch (error) {
      return serverError()
    }
  }
}
