import { Router } from 'express'
import { makeAddCityController } from '../factories/city/add-city'
import { makeListCitiesController } from '../factories/city/list-cities'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/cities', adaptRoute(makeAddCityController()))
  router.get('/cities', adaptRoute(makeListCitiesController()))
}
