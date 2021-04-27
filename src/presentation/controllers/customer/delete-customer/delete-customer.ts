import { Controller, HttpRequest, HttpResponse, badRequest, MissingParamError, DeleteCustomerById, serverError } from './delete-customer-protocols'

export class DeleteCustomerController implements Controller {
  constructor (private readonly deleteCustomerById: DeleteCustomerById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.deleteCustomerById.deleteById(httpRequest.params.customerId)
      return badRequest(new MissingParamError('customerId'))
    } catch (error) {
      return serverError()
    }
  }
}
