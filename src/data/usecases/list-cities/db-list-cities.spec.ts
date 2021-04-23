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

const makeListCitiesRepositoryStub = (): ListCitiesRepository => {
  class ListCitiesRepositoryStub implements ListCitiesRepository {
    async list (params?: any): Promise<CityModel[]> {
      return await new Promise(resolve => resolve(makeFakeCities()))
    }
  }

  return new ListCitiesRepositoryStub()
}

interface SutTypes {
  sut: DbListCities
  listCitiesRepositoryStub: ListCitiesRepository
}

const makeSut = (): SutTypes => {
  const listCitiesRepositoryStub = makeListCitiesRepositoryStub()
  const sut = new DbListCities(listCitiesRepositoryStub)
  return {
    listCitiesRepositoryStub,
    sut
  }
}

describe('DbListCities', () => {
  test('Should call ListCitiesRepository with correct values', async () => {
    const { sut, listCitiesRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listCitiesRepositoryStub, 'list')

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

  test('Should return a list of Cities on success', async () => {
    const { sut } = makeSut()

    const params = {
      name: 'any_name',
      state: 'any_state'
    }

    const cities = await sut.list(params)

    expect(cities).toEqual(makeFakeCities())
  })
})
