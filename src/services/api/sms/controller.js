import Joi from 'joi'
import { parseNumber, formatNumber } from 'libphonenumber-js'
import { Exception } from '../../../utils/Exception.class'
import { sendSMS } from '../../../utils/sendSms'
import logger from '../../../config/winston'
import queries from '../../../db/queries/messages'

const schema = Joi.object().keys({
  phoneNumber: Joi.string().required().trim().min(2).max(40),
  text: Joi.string().required().trim().min(1).max(256),
  country: Joi.string().trim().length(2)
})

async function send (ctx) {
  const { error, value } = schema.validate(ctx.request.body)
  if (error) throw new Exception(400, 'Validation error!', error.details)
  const { phoneNumber, text, country } = value
  /* VALIDATE AND FORMAT NUMBER */
  let to
  try {
    const number = parseNumber(phoneNumber, country)
    if (Object.keys(number).length === 0) throw new Exception(400, 'Phone number is not valid!')
    to = formatNumber(number, 'E.164')
  } catch (err) {
    throw new Exception(400, err.message)
  }
  /* SEND SMS */
  let message
  try {
    message = await sendSMS(to, text, ctx.twilio)
    logger.info(`sms sent to ${message.to} with text ${message.body}`)
    await queries.add(message)
  } catch (err) {
    throw new Exception(400, err.message)
  }
  ctx.status = 200
  ctx.body = { status: 'success', message: message }
}

async function webhook (ctx) {
  ctx.status = 200
  ctx.body = ctx.request.body
}

export default {
  send,
  webhook
}
