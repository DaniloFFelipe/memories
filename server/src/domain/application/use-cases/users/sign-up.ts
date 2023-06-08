import { UseCase } from '../user-case'

import { AppError, left, right } from '@/core'

import { User } from '@/domain/enterprise'
import { UserRepository } from '@/domain/application/repositories/user-repository'

type Input = {
  name: string
  email: string
  password: string
  pictureUrl: string
}

type Output = {
  user: User
}

export class SignUp implements UseCase<Input, Output> {
  constructor(private userRepository: UserRepository) {}

  async execute(props: Input) {
    const exists = await this.userRepository.findBy('email', props.email)
    if (exists) {
      return left(new AppError('BAD_REQUEST', 'user-already-exists'))
    }

    const user = User.create(props)
    await this.userRepository.create(user)

    return right({ user })
  }
}
