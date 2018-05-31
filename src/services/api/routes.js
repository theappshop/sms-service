import Router from 'koa-router'
import SMSRoutes from './sms/routes'
import NumberRoutes from './number/routes'

const router = new Router()

SMSRoutes.init(router)
NumberRoutes.init(router)

router.get('/api', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: '@sms-service'
  }
})

export default router
