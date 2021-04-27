import { Controller, HttpRequest, HttpResponse, badRequest, MissingParamError } from './delete-customer-protocols'

export class DeleteCustomerController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return badRequest(new MissingParamError('customerId'))
  }
}
