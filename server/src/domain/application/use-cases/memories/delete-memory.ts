import { AppError, left, right } from '@/core'

import { UseCase } from '../user-case'
import { MemoryRepository } from '../../repositories'
import { EntityId } from '@/domain/enterprise'

type Input = {
  memoryId: string
  userId: string
}

type Output = {}

export class DeleteMemory implements UseCase<Input, Output> {
  constructor(private memoryRepository: MemoryRepository) {}

  async execute({ userId, memoryId }: Input) {
    const memory = await this.memoryRepository.findBy('id', {
      id: EntityId.create(memoryId),
    })

    if (!memory) {
      return left(new AppError('NOT_FOUND', 'memory-not-found'))
    }

    if (!memory.isPublic && memory.ownerId.toValue() !== userId) {
      return left(new AppError('FORBBIDEN', 'user-isnt-owner'))
    }

    await this.memoryRepository.delete(memoryId)
    return right({})
  }
}
