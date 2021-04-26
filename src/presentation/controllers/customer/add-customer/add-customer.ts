import { FindOneCity } from './../../../../domain/usecases/city/find-one-city'
import { MissingParamError } from './../../../errors/missing-param-errors'
import { badRequest, serverError } from './../../../helpers/http-helper'
import { HttpRequest, HttpResponse } from './../../../protocols/http'
import { Controller } from './../../../protocols/controller'

export class AddCustomerController implements Controller {
  constructor (private readonly findOneCity: FindOneCity) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'gender', 'age', 'birthdate_at', 'city']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { city } = httpRequest.body
      await this.findOneCity.findBy({
        id: city
      })

      return {
        statusCode: 200,
        body: null
      }
    } catch (error) {
      return serverError()
    }
  }
}
