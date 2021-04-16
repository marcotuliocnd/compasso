import { HttpRequest, HttpResponse } from '../../protocols/http'

export class AddCityController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }

    if (!httpRequest.body.state) {
      return {
        statusCode: 400,
        body: new Error('Missing param: state')
      }
    }

    return {
      body: null,
      statusCode: 200
    }
  }
}
