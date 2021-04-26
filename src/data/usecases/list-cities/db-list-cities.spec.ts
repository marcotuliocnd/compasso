import {
  ListCitiesModel,
  DbListCities,
  ListCitiesRepository,
  CityModel
} from './db-list-cities-protocols'

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
    async list (params?: ListCitiesModel): Promise<CityModel[]> {
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

describe('DbListCities Usecase', () => {
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

  test('Should throw if ListCitiesRepository throws', async () => {
    const { sut, listCitiesRepositoryStub } = makeSut()
    jest.spyOn(listCitiesRepositoryStub, 'list').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const params = {
      name: 'any_name',
      state: 'any_state'
    }

    const promise = sut.list(params)

    await expect(promise).rejects.toThrow()
  })

  test('Should call ListCitiesRepository only with name if only name is provided', async () => {
    const { sut, listCitiesRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listCitiesRepositoryStub, 'list')

    const params = {
      name: 'any_name'
    }

    await sut.list(params)

    expect(listSpy).toBeCalledWith({
      name: 'any_name'
    })
    expect(listSpy).not.toBeCalledWith({
      name: 'any_name',
      state: 'any_state'
    })
  })

  test('Should call ListCitiesRepository only with state if only state is provided', async () => {
    const { sut, listCitiesRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listCitiesRepositoryStub, 'list')

    const params = {
      state: 'any_state'
    }

    await sut.list(params)

    expect(listSpy).toBeCalledWith({
      state: 'any_state'
    })
    expect(listSpy).not.toBeCalledWith({
      name: 'any_name',
      state: 'any_state'
    })
  })

  test('Should get default params value if no params is passed', async () => {
    const { sut } = makeSut()
    const listSpy = jest.spyOn(sut, 'list')

    await sut.list()

    expect(listSpy).toBeCalledWith()
  })
})
