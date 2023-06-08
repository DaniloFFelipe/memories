import { MemoryRepository } from '../repositories/memory-repository'

export interface Input {
  coverUrl: string
  description: string
  isPublic: boolean
}

export class CreateMemory {
  constructor(private memoryRepository: MemoryRepository) {}

  async execute(input: Input) {
    const result = await this.memoryRepository.create(input)
    return result
  }
}
