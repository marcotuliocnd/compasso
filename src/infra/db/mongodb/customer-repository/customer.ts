import { MongoHelper } from './../helpers/mongo-helper'
import { CustomerModel } from './../../../../domain/models/customer'
import { AddCustomerModel } from './../../../../domain/usecases/customer/add-customer'
import { AddCustomerRepository } from './../../../../data/protocols/add-customer-repository'

export class CustomerMongoRepository implements AddCustomerRepository {
  async add (customerData: AddCustomerModel): Promise<CustomerModel> {
    const customerCollection = MongoHelper.getCollection('customers')

    const result = await customerCollection.insertOne(customerData)
    return MongoHelper.map(result.ops[0])
  }
}
