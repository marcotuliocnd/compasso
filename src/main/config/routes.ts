import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/v1', router)
  readdirSync(path.join(__dirname, '..', 'routes')).map(async file => {
    if (!file.includes('.test.')) {
      const route = (await import(path.join(__dirname, '..', 'routes', file))).default

      route(router)
    }
  })
}
