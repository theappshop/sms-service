import NumberController from './controller'

export default {
  init: function (router) {
    router.post('/api/number/format', NumberController.format)
  }
}
