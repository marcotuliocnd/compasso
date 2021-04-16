import { HttpRequest, HttpResponse, MissingParamError, badRequest, Controller } from './add-city-protocols'

export class AddCityController implements Controller {
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
