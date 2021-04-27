import { ServerError } from '../errors/server-errors'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    error: error.message
  }
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: {
    error: error.message
  }
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: {
    error: new ServerError().message
  }
})

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const unprocessableEntity = (body: any): HttpResponse => ({
  statusCode: 422,
  body
})
