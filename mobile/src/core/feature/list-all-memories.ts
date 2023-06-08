import { MemoryRepository } from '../repositories/memory-repository'

export interface Input {
  page?: number
  perPage?: number
}

export class ListAllMemories {
  constructor(private memoryRepository: MemoryRepository) {}

  async execute({ page = 1, perPage = 10 }: Input) {
    const result = await this.memoryRepository.findAll({
      page,
      perPage,
    })
    return result
  }
}
