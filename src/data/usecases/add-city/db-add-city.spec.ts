import { AddCityRepository } from '../../protocols/add-city-repository'
import { CityModel } from '../../../domain/models/city'
import { DbAddCity } from './db-add-city'
import { AddCityModel } from '../../../domain/usecases/city/add-city'

describe('DbAddCity Usecase', () => {
  test('Should call AddCityRepository with correct values', async () => {
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

    const addCityRepositoryStub = new AddCityRepositoryStub()
    const sut = new DbAddCity(addCityRepositoryStub)
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
})
