import { Controller, HttpRequest, HttpResponse, badRequest, MissingParamError } from './show-customer-protocols'

export class ShowCustomerController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return badRequest(new MissingParamError('customerId'))
  }
}
