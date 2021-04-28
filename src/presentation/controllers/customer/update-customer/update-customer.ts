import { MissingParamError } from './../../../errors/missing-param-errors'
import { badRequest } from './../../../helpers/http-helper'
import { HttpRequest, HttpResponse } from './../../../protocols/http'
import { Controller } from './../../../protocols/controller'

export class UpdateCustomerController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return badRequest(new MissingParamError('customerId'))
  }
}
