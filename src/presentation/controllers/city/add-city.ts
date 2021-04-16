import {
  HttpRequest,
  HttpResponse,
  MissingParamError,
  badRequest,
  Controller,
  StateValidator,
  InvalidParamError,
  serverError,
  AddCity
} from './add-city-protocols'

export class AddCityController implements Controller {
  private readonly stateValidator: StateValidator
  private readonly addCity: AddCity

  constructor (stateValidator: StateValidator, addCity: AddCity) {
    this.stateValidator = stateValidator
    this.addCity = addCity
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

      this.addCity.add({
        name: httpRequest.body.name,
        state: httpRequest.body.state
      })

      return {
        body: null,
        statusCode: 200
      }
    } catch (error) {
      return serverError()
    }
  }
}
