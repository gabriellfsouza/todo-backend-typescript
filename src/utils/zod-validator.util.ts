import { ZodSchema } from 'zod'
import KnownError from './knwon-error.util'

export default class ZodValidatorUtil<T> {
  constructor (private zodSchema: ZodSchema<T>) {}

  validate(data: unknown): T {
    const result = this.zodSchema.safeParse(data)
    if(!result.success) {
      throw new KnownError(result.error.message)
    }
    return result.data
  }
}
