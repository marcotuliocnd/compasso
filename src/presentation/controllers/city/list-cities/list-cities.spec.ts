import { ListCitiesController } from './list-cities'
import { CityModel, ListCities } from './list-cities-protocols'

const makeFakeCities = (): CityModel[] => {
  return [{
    id: 'any_id',
    name: 'any_name',
    state: 'any_state'
  }, {
    id: 'other_id',
    name: 'other_name',
    state: 'other_state'
  }]
}

describe('ListCity Controller', () => {
  test('Shoud call ListCities with correct values', async () => {
    class ListCitiesStub implements ListCities {
      async list (params: any = {}): Promise<CityModel[]> {
        return await new Promise(resolve => resolve(makeFakeCities()))
      }
    }

    const listCitiesStub = new ListCitiesStub()
    const listSpy = jest.spyOn(listCitiesStub, 'list')
    const sut = new ListCitiesController(listCitiesStub)
    const httpRequest = {
      params: {
        name: 'any_name',
        state: 'any_state'
      }
    }

    await sut.handle(httpRequest)
    expect(listSpy).toHaveBeenCalledWith({
      name: 'any_name',
      state: 'any_state'
    })
  })
})
