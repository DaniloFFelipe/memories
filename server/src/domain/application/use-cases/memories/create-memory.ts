import { Memory } from '@/domain/enterprise/entities/memory'
import { right } from '@/core'

import { UseCase } from '../user-case'
import { MemoryRepository } from '../../repositories'

type Input = {
  ownerId: string
  description: string
  isPublic: boolean
  coverUrl: string
}

type Output = {
  memory: Memory
}

export class CreateMemory implements UseCase<Input, Output> {
  constructor(private memoryRepository: MemoryRepository) {}

  async execute(props: Input) {
    console.log(props)
    const memory = Memory.create({ ...props, createdAt: new Date() })
    await this.memoryRepository.create(memory)

    return right({ memory })
  }
}
