import {
  FindOneCity,
  HttpRequest,
  MissingParamError,
  Controller,
  badRequest,
  serverError,
  HttpResponse,
  notFound,
  InvalidParamError
} from './add-customer-protocols'

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

      const cityExists = await this.findOneCity.findBy({
        id: city
      })
      if (!cityExists) {
        return notFound(new InvalidParamError('city'))
      }

      return {
        statusCode: 200,
        body: null
      }
    } catch (error) {
      return serverError()
    }
  }
}
