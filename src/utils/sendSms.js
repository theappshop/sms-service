import { TW_NUMBER } from '../config/env.config'

export async function sendSMS (to, text, client) {
  return client.messages.create({
    body: text,
    to: to,
    from: TW_NUMBER
  })
}
