import { Memory } from '@/domain/enterprise/entities/memory'
import { AppError, left, right } from '@/core'

import { UseCase } from '../user-case'
import { MemoryRepository } from '../../repositories'

type Input = {
  memoryId: string
  userId: string
}

type Output = {
  memory: Memory
}

export class GetMemory implements UseCase<Input, Output> {
  constructor(private memoryRepository: MemoryRepository) {}

  async execute({ userId, memoryId }: Input) {
    const memory = await this.memoryRepository.findBy({
      field: 'id',
      value: memoryId,
    })

    if (!memory) {
      return left(new AppError('NOT_FOUND', 'memory-not-found'))
    }

    if (!memory.isPublic && memory.ownerId.toValue() !== userId) {
      return left(new AppError('FORBBIDEN', 'user-isnt-owner'))
    }

    return right({ memory })
  }
}
