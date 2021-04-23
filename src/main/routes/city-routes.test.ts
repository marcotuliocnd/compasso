import request from 'supertest'
import app from '../config/app'

describe('City Routes', () => {
  test('Should return a city on success', async () => {
    await request(app)
      .post('/v1/cities')
      .send({
        name: 'Uberlandia',
        state: 'MG'
      })
      .expect(200)
  })
})
