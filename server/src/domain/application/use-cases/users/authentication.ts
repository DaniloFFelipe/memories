import { UseCase } from '../user-case'

import { AppError, left, right } from '@/core'

import { User } from '@/domain/enterprise'
import { UserRepository } from '@/domain/application/repositories/user-repository'

type Input = {
  email: string
  password: string
}

type Output = {
  user: User
}

export class Authentication implements UseCase<Input, Output> {
  constructor(private userRepository: UserRepository) {}

  async execute(props: Input) {
    const user = await this.userRepository.findBy('email', props.email)
    if (!user) {
      return left(new AppError('BAD_REQUEST', 'invalid-credentials'))
    }

    if (!(await user.password.compare(props.password))) {
      return left(new AppError('BAD_REQUEST', 'invalid-credentials'))
    }

    return right({ user })
  }
}
