import { Memory as PMemory } from '@prisma/client'

import { Pagination, PaginationResult, FindByOption } from '@/core'
import { MemoryRepository } from '@/domain/application'
import { MemoryCreateProps, Memory } from '@/domain/enterprise'
import { prisma } from '@/infra/lib/prisma'
import { MemoryMapper } from '@/infra/mappers/memory-mapper'

export class PrismaMemoryRepository implements MemoryRepository {
  async findBy(
    options: FindByOption<MemoryCreateProps>,
  ): Promise<Memory | null> {
    const where = { [options.field]: options.value }
    let memory: PMemory | null = null

    if (options.field === 'id') {
      memory = await prisma.memory.findUnique({
        where,
      })
    } else {
      memory = await prisma.memory.findFirst({
        where,
      })
    }

    return memory ? MemoryMapper.fromPrisma(memory) : null
  }

  async findManyBy(
    options: FindByOption<MemoryCreateProps>,
  ): Promise<Memory[]> {
    const where = { [options.field]: options.value }

    const memory = await prisma.memory.findMany({
      where,
    })

    return memory.map(MemoryMapper.fromPrisma)
  }

  async findManyWhereVisible(
    ownerId: string,
    options: Pagination,
  ): Promise<PaginationResult<Memory[]>> {
    const take = options.perPage
    const skip = (options.page - 1) * options.perPage

    const memory = await prisma.memory.findMany({
      where: {
        OR: {
          isPublic: true,
          ownerId,
        },
      },
      orderBy: {
        createAt: 'desc',
      },
      take,
      skip,
    })
    const total = await prisma.memory.count({
      where: {
        OR: {
          isPublic: true,
          ownerId,
        },
      },
    })
    const data = memory.map(MemoryMapper.fromPrisma)

    return {
      data,
      meta: {
        page: options.page,
        perPage: options.perPage,
        total,
      },
    }
  }

  async save(memory: Memory): Promise<void> {
    const pMemory = MemoryMapper.toPrisma(memory)
    await prisma.memory.update({
      where: {
        id: memory.id.toValue(),
      },
      data: {
        coverUrl: pMemory.coverUrl,
        description: pMemory.description,
        isPublic: pMemory.isPublic,
      },
    })
  }

  async create(memory: Memory): Promise<void> {
    const data = MemoryMapper.toPrisma(memory)
    await prisma.memory.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.memory.delete({
      where: {
        id,
      },
    })
  }
}
