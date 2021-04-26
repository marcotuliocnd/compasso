import { DbFindOneCity } from './db-find-one-city'
import { FindByCityRepository } from './../../protocols/find-by-city-repository'
import { CityModel } from './../../../domain/models/city'
import { FindOneCityModel } from './../../../domain/usecases/city/find-one-city'

const makeFindByCityRepositoryStub = (): FindByCityRepository => {
  class FindByCityRepositoryStub implements FindByCityRepository {
    async findBy (params: FindOneCityModel): Promise<CityModel | null> {
      return await new Promise(resolve => resolve({
        id: 'any_id',
        name: 'any_name',
        state: 'any_state'
      }))
    }
  }

  return new FindByCityRepositoryStub()
}

interface SutTypes {
  sut: DbFindOneCity
  findByCityRepositoryStub: FindByCityRepository
}

const makeSut = (): SutTypes => {
  const findByCityRepositoryStub = makeFindByCityRepositoryStub()
  const sut = new DbFindOneCity(findByCityRepositoryStub)
  return {
    findByCityRepositoryStub,
    sut
  }
}

describe('DbFindOneCity Usecase', () => {
  test('Should call FindByCityRepository with correct values', async () => {
    const { findByCityRepositoryStub, sut } = makeSut()

    const findBySpy = jest.spyOn(findByCityRepositoryStub, 'findBy')

    await sut.findBy({
      id: 'any_id'
    })

    expect(findBySpy).toHaveBeenCalledWith({
      id: 'any_id'
    })
  })

  test('Should return a city if param is found', async () => {
    const { findByCityRepositoryStub, sut } = makeSut()

    jest.spyOn(findByCityRepositoryStub, 'findBy').mockReturnValueOnce(new Promise(resolve => resolve({
      id: 'any_id',
      name: 'any_name',
      state: 'any_state'
    })))

    const city = await sut.findBy({
      id: 'any_id'
    })

    expect(city).toEqual({
      id: 'any_id',
      name: 'any_name',
      state: 'any_state'
    })
  })
})
