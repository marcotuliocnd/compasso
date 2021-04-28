import { MissingParamError } from './../../../errors/missing-param-errors'
import { badRequest } from './../../../helpers/http-helper'
import { HttpRequest, HttpResponse } from './../../../protocols/http'
import { Controller } from './../../../protocols/controller'
import { UpdateCustomerById } from './../../../../domain/usecases/customer/update-customer-by-id'

export class UpdateCustomerController implements Controller {
  constructor (private readonly updateCustomerById: UpdateCustomerById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.updateCustomerById.update(httpRequest.params.customerId, httpRequest.body)

    return badRequest(new MissingParamError('customerId'))
  }
}
