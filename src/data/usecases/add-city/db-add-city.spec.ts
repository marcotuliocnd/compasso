import { AddCityRepository, CityModel, DbAddCity, AddCityModel } from './db-add-city-protocols'

const makeAddCityRepositoryStub = (): AddCityRepository => {
  class AddCityRepositoryStub implements AddCityRepository {
    async add (cityData: AddCityModel): Promise<CityModel> {
      const fakeCity = {
        id: 'any_id',
        name: 'any_name',
        state: 'any_state'
      }
      return await new Promise(resolve => resolve(fakeCity))
    }
  }

  return new AddCityRepositoryStub()
}

interface SutTypes {
  sut: DbAddCity
  addCityRepositoryStub: AddCityRepository
}

const makeSut = (): SutTypes => {
  const addCityRepositoryStub = makeAddCityRepositoryStub()
  const sut = new DbAddCity(addCityRepositoryStub)

  return {
    sut,
    addCityRepositoryStub
  }
}

describe('DbAddCity Usecase', () => {
  test('Should call AddCityRepository with correct values', async () => {
    const { sut, addCityRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addCityRepositoryStub, 'add')
    const cityData = {
      name: 'valid_name',
      state: 'valid_state'
    }

    await sut.add(cityData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      state: 'valid_state'
    })
  })

  test('Should throw if AddCityRepository throws', async () => {
    const { sut, addCityRepositoryStub } = makeSut()

    jest.spyOn(addCityRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const cityData = {
      name: 'valid_name',
      state: 'valid_state'
    }

    const promise = sut.add(cityData)
    await expect(promise).rejects.toThrow()
  })
})
