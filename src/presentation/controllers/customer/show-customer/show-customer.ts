import { Controller, HttpRequest, HttpResponse, badRequest, MissingParamError, FindCustomerById, serverError } from './show-customer-protocols'

export class ShowCustomerController implements Controller {
  constructor (private readonly findCustomerById: FindCustomerById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.findCustomerById.findById(httpRequest.params.customerId)
      return badRequest(new MissingParamError('customerId'))
    } catch (error) {
      return serverError()
    }
  }
}
