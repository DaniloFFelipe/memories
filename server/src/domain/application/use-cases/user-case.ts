import { AppError } from '../../../core/errors/app-errors'
import { Either } from '../../../core/types/either'

export interface UseCase<Input, Output> {
  execute(props: Input): Promise<Either<Output, AppError>>
}
