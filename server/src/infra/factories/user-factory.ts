import { UserRepository } from '@/domain/application'
import { SignUp } from '@/domain/application/use-cases'
import { Authentication } from '@/domain/application/use-cases/users/authentication'

export class UserFactory {
  constructor(private userRepository: UserRepository) {}

  authentication() {
    return new Authentication(this.userRepository)
  }

  signUp() {
    return new SignUp(this.userRepository)
  }
}
