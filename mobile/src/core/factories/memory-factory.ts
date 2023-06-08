import { CreateMemory } from '../feature/create-memory'
import { ListAllMemories } from '../feature/list-all-memories'
import { HttpMemoryRepository } from '../repositories/http/http-memory-repository'

export const MemoryFactory = {
  listAllMemories() {
    return new ListAllMemories(new HttpMemoryRepository())
  },
  createMemory() {
    return new CreateMemory(new HttpMemoryRepository())
  },
}
