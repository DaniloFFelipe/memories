import { AppError, left, right } from '@/core'

import { UseCase } from '../user-case'
import { MemoryRepository } from '../../repositories'
import { Description, IsPublic, Memory, Url } from '@/domain/enterprise'

type Input = {
  memoryId: string
  userId: string

  description?: string
  isPublic?: boolean
  coverUrl?: string
}

type Output = {
  memory: Memory
}

export class UpdateMemory implements UseCase<Input, Output> {
  constructor(private memoryRepository: MemoryRepository) {}

  async execute({ userId, memoryId, coverUrl, description, isPublic }: Input) {
    let memory = await this.memoryRepository.findBy({
      field: 'id',
      value: memoryId,
    })

    if (!memory) {
      return left(new AppError('NOT_FOUND', 'memory-not-found'))
    }

    if (!memory.isPublic && memory.ownerId.toValue() !== userId) {
      return left(new AppError('FORBBIDEN', 'user-isnt-owner'))
    }

    memory = memory.copyWith({
      description: description ? Description.create(description) : undefined,
      isPublic: isPublic ? IsPublic.create(isPublic) : undefined,
      coverUrl: coverUrl ? Url.create(coverUrl) : undefined,
    })

    await this.memoryRepository.save(memory)
    return right({ memory })
  }
}
