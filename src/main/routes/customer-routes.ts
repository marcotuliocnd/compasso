import { makeUpdateCustomerController } from './../factories/customer/update-customer'
import { makeListCustomerController } from './../factories/customer/list-customer'
import { makeShowCustomerController } from './../factories/customer/show-customer'
import { Router } from 'express'
import { makeAddCustomerController } from '../factories/customer/add-customer'
import { makeDeleteCustomerController } from '../factories/customer/delete-customer'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/customers', adaptRoute(makeListCustomerController()))
  router.patch('/customers/:customerId', adaptRoute(makeUpdateCustomerController()))
  router.post('/customers', adaptRoute(makeAddCustomerController()))
  router.get('/customers/:customerId', adaptRoute(makeShowCustomerController()))
  router.delete('/customers/:customerId', adaptRoute(makeDeleteCustomerController()))
}
