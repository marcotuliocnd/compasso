import {
  InvalidParamError,
  FindOneCity,
  MissingParamError,
  badRequest,
  notFound,
  serverError,
  ok,
  HttpRequest,
  HttpResponse,
  Controller,
  UpdateCustomerById
} from './update-customer-protocols'

export class UpdateCustomerController implements Controller {
  constructor (private readonly updateCustomerById: UpdateCustomerById, private readonly findOneCity: FindOneCity) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id, ...updateParams } = httpRequest.body

      if (!httpRequest.params.customerId) {
        return badRequest(new MissingParamError('customerId'))
      }

      if (updateParams.city) {
        const cityFound = await this.findOneCity.findBy(updateParams.city)

        if (!cityFound) {
          return notFound(new InvalidParamError('city'))
        }
      }

      const updatedCustomer = await this.updateCustomerById.update(httpRequest.params.customerId, updateParams)
      return ok(updatedCustomer)
    } catch (error) {
      return serverError()
    }
  }
}
