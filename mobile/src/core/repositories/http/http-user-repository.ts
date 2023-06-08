import { api } from '../../../lib'
import { InvalidCredentials } from '../../errors/invalid-credentials'
import { Session, SessionProps } from '../../models/session'
import { Either, left, right } from '../../types/either'
import {
  AuthenticationParams,
  SignUpParams,
  UserRepository,
} from '../user-repository'

export class HttpUserRepository implements UserRepository {
  async signUp(
    data: SignUpParams,
  ): Promise<Either<InvalidCredentials, Session>> {
    try {
      const { data: responseData } = await api.post<SessionProps>(
        '/api/users/sign-up',
        data,
      )
      const session = Session.create(responseData)
      return right(session)
    } catch (error) {
      return left(new InvalidCredentials())
    }
  }

  async authentication(
    data: AuthenticationParams,
  ): Promise<Either<InvalidCredentials, Session>> {
    try {
      const { data: responseData } = await api.post<SessionProps>(
        'api/users/auth',
        data,
      )
      const session = Session.create(responseData)
      return right(session)
    } catch (error) {
      return left(new InvalidCredentials())
    }
  }
}
