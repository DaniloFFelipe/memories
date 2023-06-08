import { Memory } from '@/domain/enterprise/entities/memory'
import { PaginationResult, right } from '@/core'

import { UseCase } from '../user-case'
import { MemoryRepository } from '../../repositories'

type Input = {
  userId: string
  perPage: number
  page: number
}

type Output = {
  memories: PaginationResult<Memory[]>
}

export class ListMemories implements UseCase<Input, Output> {
  constructor(private memoryRepository: MemoryRepository) {}

  async execute({ userId, page, perPage }: Input) {
    const memories = await this.memoryRepository.findManyWhereVisible(userId, {
      page,
      perPage,
    })

    return right({ memories })
  }
}
