import { ListCustomer } from './../../../../domain/usecases/customer/list-customer'
import { ok, serverError } from './../../../helpers/http-helper'
import { HttpRequest, HttpResponse } from './../../../protocols/http'
import { Controller } from './../../../protocols/controller'

export class ListCustomerController implements Controller {
  constructor (private readonly listCustomer: ListCustomer) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.listCustomer.list(httpRequest.body)
      return ok(null)
    } catch (error) {
      return serverError()
    }
  }
}
