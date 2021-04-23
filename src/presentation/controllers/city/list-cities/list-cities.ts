import { HttpRequest, HttpResponse, Controller, ListCities, ok, serverError } from './list-cities-protocols'

export class ListCitiesController implements Controller {
  constructor (private readonly listCities: ListCities) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const cities = await this.listCities.list(httpRequest.params)
      return ok(cities)
    } catch (error) {
      return serverError()
    }
  }
}
