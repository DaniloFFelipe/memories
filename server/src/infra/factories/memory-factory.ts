import { MemoryRepository } from '@/domain/application'
import { CreateMemory } from '@/domain/application/use-cases/memories/create-memory'
import { DeleteMemory } from '@/domain/application/use-cases/memories/delete-memory'
import { GetMemory } from '@/domain/application/use-cases/memories/get-memory'
import { ListMemories } from '@/domain/application/use-cases/memories/list-memories'
import { UpdateMemory } from '@/domain/application/use-cases/memories/update-memory'

export class MemoryFactory {
  constructor(private memoryRepository: MemoryRepository) {}

  createMemory() {
    return new CreateMemory(this.memoryRepository)
  }

  deleteMemory() {
    return new DeleteMemory(this.memoryRepository)
  }

  getMemory() {
    return new GetMemory(this.memoryRepository)
  }

  listMemory() {
    return new ListMemories(this.memoryRepository)
  }

  updateMemory() {
    return new UpdateMemory(this.memoryRepository)
  }
}
