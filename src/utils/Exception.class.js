export class Exception extends Error {
  constructor (statusCode, message, payload) {
    super(message)
    this._statusCode = statusCode
    this._payload = payload
  }
  get statusCode () {
    return this._statusCode
  }
  toObject () {
    const res = {
      statusCode: this._statusCode,
      message: this.message,
    }
    if (this._payload) {
      res.payload = this._payload
    }
    return res
  }
}
