import { Router } from 'express'

export default (router: Router): void => {
  router.post('/cities', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
