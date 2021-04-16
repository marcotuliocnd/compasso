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
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  test('Should return 400 if no state is provided', () => {
    const sut = new AddCityController()

    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: state'))
  })
})
