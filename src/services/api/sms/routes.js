import SMSController from './controller'

export default {
  init: function (router) {
    router.post('/api/sms/send', SMSController.send)
    router.post('/api/sms/webhook', SMSController.webhook)
  }
}
