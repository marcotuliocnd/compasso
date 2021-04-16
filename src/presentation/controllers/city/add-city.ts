import {
  HttpRequest,
  HttpResponse,
  MissingParamError,
  badRequest,
  Controller,
  StateValidator,
  InvalidParamError,
  ServerError
} from './add-city-protocols'

export class AddCityController implements Controller {
  private readonly stateValidator: StateValidator

  constructor (stateValidator: StateValidator) {
    this.stateValidator = stateValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'state']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.stateValidator.isValid(httpRequest.body.state)
      if (!isValid) {
        return badRequest(new InvalidParamError('state'))
      }

      return {
        body: null,
        statusCode: 200
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
