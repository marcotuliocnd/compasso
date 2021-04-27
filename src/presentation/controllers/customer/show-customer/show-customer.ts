import { Controller, HttpRequest, HttpResponse, badRequest, MissingParamError, FindCustomerById, serverError, ok } from './show-customer-protocols'

export class ShowCustomerController implements Controller {
  constructor (private readonly findCustomerById: FindCustomerById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params.customerId) {
        return badRequest(new MissingParamError('customerId'))
      }

      const customer = await this.findCustomerById.findById(httpRequest.params.customerId)

      return ok(customer)
    } catch (error) {
      return serverError()
    }
  }
}
