import { ListCitiesController } from './list-cities'
import { CityModel, ListCities, ok, serverError } from './list-cities-protocols'

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

const makeListCitiesStub = (): ListCities => {
  class ListCitiesStub implements ListCities {
    async list (params: any = {}): Promise<CityModel[]> {
      return await new Promise(resolve => resolve(makeFakeCities()))
    }
  }

  return new ListCitiesStub()
}

interface SutTypes {
  sut: ListCitiesController
  listCitiesStub: ListCities
}

const makeSut = (): SutTypes => {
  const listCitiesStub = makeListCitiesStub()
  const sut = new ListCitiesController(listCitiesStub)
  return {
    listCitiesStub,
    sut
  }
}

describe('ListCity Controller', () => {
  test('Shoud call ListCities with correct values', async () => {
    const { sut, listCitiesStub } = makeSut()
    const listSpy = jest.spyOn(listCitiesStub, 'list')
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

  test('Sould return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeCities()))
  })

  test('Sould return 500 if ListCities throws', async () => {
    const { sut, listCitiesStub } = makeSut()
    jest.spyOn(listCitiesStub, 'list').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError())
  })
})
