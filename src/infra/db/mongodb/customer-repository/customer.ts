import { UpdateCustomerByIdModel } from './../../../../domain/usecases/customer/update-customer-by-id'
import { UpdateCustomerByIdRepository } from './../../../../data/protocols/update-customer-by-id-repository'
import { ListCustomerRepository } from './../../../../data/protocols/list-customer-repository'
import { ListCustomerModel } from './../../../../domain/usecases/customer/list-customer'
import { FindCustomerByIdRepository } from './../../../../data/protocols/find-customer-by-id-repository'
import { MongoHelper } from './../helpers/mongo-helper'
import { CustomerModel } from './../../../../domain/models/customer'
import { AddCustomerModel } from './../../../../domain/usecases/customer/add-customer'
import { AddCustomerRepository } from './../../../../data/protocols/add-customer-repository'

export class CustomerMongoRepository implements AddCustomerRepository, FindCustomerByIdRepository, ListCustomerRepository, UpdateCustomerByIdRepository {
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

  async list (params: ListCustomerModel = {}): Promise<CustomerModel[]> {
    const customerCollection = MongoHelper.getCollection('customers')
    const customers: CustomerModel[] = await customerCollection.find(params).toArray()

    return customers.map(el => MongoHelper.map(el))
  }

  async update (id: string, params: UpdateCustomerByIdModel): Promise<CustomerModel> {
    const customerCollection = MongoHelper.getCollection('customers')
    const objectId = MongoHelper.parseObjectId(id)

    await customerCollection.updateOne({ _id: objectId }, {
      $set: params
    })

    const customer: CustomerModel | null = await customerCollection.findOne({
      _id: objectId
    })

    return MongoHelper.map(customer)
  }
}
