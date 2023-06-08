import { UserRepository } from '../repositories/user-repository'

export type Input = {
  email: string
  password: string
}

export class AuthenticateUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: Input) {
    const result = await this.userRepository.authentication({ email, password })
    return result
  }
}
