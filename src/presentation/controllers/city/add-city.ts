import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../../errors/missing-param-errors'
import { badRequest } from '../../helpers/http-helper'

export class AddCityController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'state']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      body: null,
      statusCode: 200
    }
  }
}
