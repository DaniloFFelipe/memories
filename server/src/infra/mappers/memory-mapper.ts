import { Memory } from '@/domain/enterprise'
import { Memory as PMemory } from '@prisma/client'

export const MemoryMapper = {
  fromPrisma(memory: PMemory) {
    return Memory.create(
      {
        coverUrl: memory.coverUrl,
        createdAt: memory.createAt,
        description: memory.description,
        isPublic: memory.isPublic,
        ownerId: memory.ownerId,
      },
      memory.id,
    )
  },
  toPrisma(memory: Memory): PMemory {
    console.log(memory)
    return {
      id: memory.id.toValue(),
      coverUrl: memory.coverUrl.toValue(),
      description: memory.description.toValue(),
      isPublic: memory.isPublic.toValue(),
      ownerId: memory.ownerId.toValue(),
      createAt: memory.createdAt,
    }
  },
  toHttp(memory: Memory) {
    return {
      id: memory.id.toValue(),
      coverUrl: memory.coverUrl.toValue(),
      description: memory.description.toValue(),
      isPublic: memory.isPublic.toValue(),
      ownerId: memory.ownerId.toValue(),
      createAt: memory.createdAt,
    }
  },
}
