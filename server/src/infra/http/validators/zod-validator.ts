import { AppError, Either, left, right } from '@/core'
import { Validator } from './validator'
import { ZodSchema } from 'zod'

export class ZodValidator<Props> implements Validator<Props> {
  constructor(private schema: ZodSchema<Props>) {}
  async check(data: unknown): Promise<Either<Props, AppError>> {
    const props = this.schema.safeParse(data)
    if (!props.success) {
      return left(new AppError('BAD_REQUEST', 'invalid-params'))
    }

    return right(props.data)
  }
}
