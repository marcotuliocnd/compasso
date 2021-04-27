import { makeShowCustomerController } from './../factories/customer/show-customer'
import { Router } from 'express'
import { makeAddCustomerController } from '../factories/customer/add-customer'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/customers', adaptRoute(makeAddCustomerController()))
  router.get('/customers/:customerId', adaptRoute(makeShowCustomerController()))
}
