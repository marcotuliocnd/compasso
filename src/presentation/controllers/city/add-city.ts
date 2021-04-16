import { HttpRequest, HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../../errors/missing-param-errors'

export class AddCityController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (!httpRequest.body.state) {
      return {
        statusCode: 400,
        body: new MissingParamError('state')
      }
    }

    return {
      body: null,
      statusCode: 200
    }
  }
}
