import { AppError, Either } from '@/core'

export interface Validator<Props> {
  check(data: unknown): Promise<Either<Props, AppError>>
}
