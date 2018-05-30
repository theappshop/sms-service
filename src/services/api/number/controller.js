import Joi from 'joi'
import { parseNumber, formatNumber } from 'libphonenumber-js'
import { Exception } from '../../../utils/Exception.class'

const schema = Joi.object().keys({
  phoneNumber: Joi.string().required().trim().min(2).max(40),
  country: Joi.string().trim().length(2)
})

async function format (ctx) {
  const { error, value } = schema.validate(ctx.request.body)
  if (error) throw new Exception(400, 'Validation error!', error.details)
  const { phoneNumber, country } = value
  let to
  try {
    const number = parseNumber(phoneNumber, country)
    if (Object.keys(number).length === 0) throw new Exception(400, `Phone number ${phoneNumber} is not valid!`)
    to = formatNumber(number, 'E.164')
  } catch (err) {
    throw new Exception(400, err.message)
  }
  ctx.status = 200
  ctx.body = { phoneNumber: to }
}

export default {
  format
}
