import { Controller, HttpRequest, HttpResponse, badRequest, MissingParamError, DeleteCustomerById, serverError, ok } from './delete-customer-protocols'

export class DeleteCustomerController implements Controller {
  constructor (private readonly deleteCustomerById: DeleteCustomerById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.customerId) {
        return badRequest(new MissingParamError('customerId'))
      }

      await this.deleteCustomerById.deleteById(httpRequest.params.customerId)

      return ok({ success: true })
    } catch (error) {
      return serverError()
    }
  }
}
