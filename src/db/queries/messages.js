import numbersQueries from './numbers'
import knex, { TABLES as T } from '../connection'

async function add (message) {
  const to = await numbersQueries.getIdByNumber(message.to)
  const from = await numbersQueries.getIdByNumber(message.from)
  await knex(T.MESSAGES).insert({
    to: to,
    from: from,
    body: message.body,
    status: message.status,
    sid: message.sid,
    error_code: message.errorCode,
    error_message: message.errorMessage,
    price: message.price,
    price_unit: message.priceUnit,
    messaging_service_sid: message.messagingServiceSid,
    sent_at: message.dateSent
  })
}

export default {
  add
}
