import { Controller, HttpRequest, HttpResponse, badRequest, MissingParamError, FindCustomerById } from './show-customer-protocols'

export class ShowCustomerController implements Controller {
  constructor (private readonly findCustomerById: FindCustomerById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.findCustomerById.findById(httpRequest.params.customerId)
    return badRequest(new MissingParamError('customerId'))
  }
}
