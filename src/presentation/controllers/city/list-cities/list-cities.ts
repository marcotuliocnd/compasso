import { HttpRequest, HttpResponse, Controller, ListCities, ok } from './list-cities-protocols'

export class ListCitiesController implements Controller {
  constructor (private readonly listCities: ListCities) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const cities = await this.listCities.list(httpRequest.params)
    return ok(cities)
  }
}
