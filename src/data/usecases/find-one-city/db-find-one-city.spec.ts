import { DbFindOneCity } from './db-find-one-city'
import { FindByCityRepository } from './../../protocols/find-by-city-repository'
import { CityModel } from './../../../domain/models/city'
import { FindOneCityModel } from './../../../domain/usecases/city/find-one-city'

describe('DbFindOneCity Usecase', () => {
  test('Should call FindByCityRepository with correct values', async () => {
    class FindByCityRepositoryStub implements FindByCityRepository {
      async findBy (params: FindOneCityModel): Promise<CityModel | null> {
        return await new Promise(resolve => resolve({
          id: 'any_id',
          name: 'any_name',
          state: 'any_state'
        }))
      }
    }

    const findByCityRepositoryStub = new FindByCityRepositoryStub()
    const sut = new DbFindOneCity(findByCityRepositoryStub)

    const findBySpy = jest.spyOn(findByCityRepositoryStub, 'findBy')

    await sut.findBy({
      id: 'any_id'
    })

    expect(findBySpy).toHaveBeenCalledWith({
      id: 'any_id'
    })
  })
})
