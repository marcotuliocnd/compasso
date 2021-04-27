import { Controller, HttpRequest, HttpResponse, badRequest, MissingParamError, DeleteCustomerById } from './delete-customer-protocols'

export class DeleteCustomerController implements Controller {
  constructor (private readonly deleteCustomerById: DeleteCustomerById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.deleteCustomerById.deleteById(httpRequest.params.customerId)
    return badRequest(new MissingParamError('customerId'))
  }
}
