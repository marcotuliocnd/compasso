import { FindCustomerByIdRepository } from './../../../../data/protocols/find-customer-by-id-repository'
import { MongoHelper } from './../helpers/mongo-helper'
import { CustomerModel } from './../../../../domain/models/customer'
import { AddCustomerModel } from './../../../../domain/usecases/customer/add-customer'
import { AddCustomerRepository } from './../../../../data/protocols/add-customer-repository'

export class CustomerMongoRepository implements AddCustomerRepository, FindCustomerByIdRepository {
  async add (customerData: AddCustomerModel): Promise<CustomerModel> {
    const customerCollection = MongoHelper.getCollection('customers')

    const result = await customerCollection.insertOne(customerData)
    return MongoHelper.map(result.ops[0])
  }

  async findById (id: string): Promise<CustomerModel | null> {
    const customerCollection = MongoHelper.getCollection('customers')
    const objectId = MongoHelper.parseObjectId(id)
    const customer: CustomerModel | null = await customerCollection.findOne({
      _id: objectId
    })

    return customer ? MongoHelper.map(customer) : null
  }

  async deleteById (id: string): Promise<boolean> {
    const customerCollection = MongoHelper.getCollection('customers')
    const objectId = MongoHelper.parseObjectId(id)
    const { result } = await customerCollection.deleteOne({
      _id: objectId
    })

    return !!result.n
  }
}
