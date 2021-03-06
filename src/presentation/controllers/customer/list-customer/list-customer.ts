import { ListCustomer } from './../../../../domain/usecases/customer/list-customer'
import { ok, serverError } from './../../../helpers/http-helper'
import { HttpRequest, HttpResponse } from './../../../protocols/http'
import { Controller } from './../../../protocols/controller'

export class ListCustomerController implements Controller {
  constructor (private readonly listCustomer: ListCustomer) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const customers = await this.listCustomer.list(httpRequest.queryParams)
      return ok(customers)
    } catch (error) {
      return serverError()
    }
  }
}
