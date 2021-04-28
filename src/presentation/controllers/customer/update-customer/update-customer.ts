import { InvalidParamError } from './../../../errors/invalid-param-errors'
import { FindOneCity } from './../../../../domain/usecases/city/find-one-city'
import { MissingParamError } from './../../../errors/missing-param-errors'
import { badRequest, notFound } from './../../../helpers/http-helper'
import { HttpRequest, HttpResponse } from './../../../protocols/http'
import { Controller } from './../../../protocols/controller'
import { UpdateCustomerById } from './../../../../domain/usecases/customer/update-customer-by-id'

export class UpdateCustomerController implements Controller {
  constructor (private readonly updateCustomerById: UpdateCustomerById, private readonly findOneCity: FindOneCity) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id, ...updateParams } = httpRequest.body

    if (updateParams.city) {
      const cityFound = await this.findOneCity.findBy(updateParams.city)

      if (!cityFound) {
        return notFound(new InvalidParamError('city'))
      }
    }

    await this.updateCustomerById.update(httpRequest.params.customerId, updateParams)

    return badRequest(new MissingParamError('customerId'))
  }
}