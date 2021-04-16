import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../../errors/missing-param-errors'
import { badRequest } from '../../helpers/http-helper'

export class AddCityController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.state) {
      return badRequest(new MissingParamError('state'))
    }

    return {
      body: null,
      statusCode: 200
    }
  }
}
