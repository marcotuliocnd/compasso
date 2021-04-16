import { AddCityController } from './add-city'

describe('AddCityController', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new AddCityController()

    const httpRequest = {
      body: {
        state: 'any_state'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
