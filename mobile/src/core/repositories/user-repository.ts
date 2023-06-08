import { InvalidCredentials } from '../errors/invalid-credentials'
import { Session } from '../models/session'
import { Either } from '../types/either'

export type AuthenticationParams = {
  email: string
  password: string
}

export type SignUpParams = {
  name: string
  email: string
  password: string
  pictureUrl: string
}

export interface UserRepository {
  authentication(
    data: AuthenticationParams,
  ): Promise<Either<InvalidCredentials, Session>>

  signUp(data: SignUpParams): Promise<Either<InvalidCredentials, Session>>
}
