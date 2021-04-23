import { DbListCities } from './db-list-cities'
import { ListCitiesRepository } from '../../protocols/list-cities-repository'
import { CityModel } from '../../../domain/models/city'

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

describe('DbListCities', () => {
  test('Should call ListCitiesRepository with correct values', async () => {
    class ListCitiesRepositoryStub implements ListCitiesRepository {
      async list (params?: any): Promise<CityModel[]> {
        return await new Promise(resolve => resolve(makeFakeCities()))
      }
    }

    const listCititesRepositoryStub = new ListCitiesRepositoryStub()
    const listSpy = jest.spyOn(listCititesRepositoryStub, 'list')
    const sut = new DbListCities(listCititesRepositoryStub)

    const params = {
      name: 'any_name',
      state: 'any_state'
    }

    await sut.list(params)

    expect(listSpy).toBeCalledWith({
      name: 'any_name',
      state: 'any_state'
    })
  })
})
