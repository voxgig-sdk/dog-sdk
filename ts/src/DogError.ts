
import { Context } from './Context'


class DogError extends Error {

  isDogError = true

  sdk = 'Dog'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  DogError
}

