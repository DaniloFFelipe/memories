import { FastifyReply, FastifyRequest } from 'fastify'
import {
  CreateMemoryParams,
  DeleteMemoryParams,
  GetMemoryParams,
  UpdateMemoryBody,
  UpdateMemoryParams,
} from '../validators/schemas'
import { MemoryFactory } from '@/infra/factories'
import { PrismaMemoryRepository } from '@/infra/repositories/prisma/prisma-memories-repository'
import { STATUS_CODES, check } from '@/core'
import { PaginationParams } from '../validators/schemas/pagination'
import { MemoryMapper } from '@/infra/mappers/memory-mapper'

export class MemoryController {
  async createMemory(req: FastifyRequest, reply: FastifyReply) {
    const params = req.body as CreateMemoryParams
    const factory = new MemoryFactory(new PrismaMemoryRepository())
    const createMemory = factory.createMemory()

    return await check(
      await createMemory.execute({ ...params, ownerId: req.user.sub }),
      async () => {
        return reply.status(STATUS_CODES.SUCCESS.CREATED).send()
      },
      async () => {
        return reply.status(500).send({ error: 'Internal Server Error' })
      },
    )
  }

  async deleteMemory(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params as DeleteMemoryParams
    const factory = new MemoryFactory(new PrismaMemoryRepository())
    const deleteMemory = factory.deleteMemory()

    return await check(
      await deleteMemory.execute({ memoryId: params.id, userId: req.user.sub }),
      async () => {
        return reply.status(STATUS_CODES.SUCCESS.NO_CONTENT).send()
      },
      async ({ message, statusCode }) => {
        return reply.status(statusCode).send({ error: message })
      },
    )
  }

  async getMemory(req: FastifyRequest, reply: FastifyReply) {
    const params = req.params as GetMemoryParams
    const factory = new MemoryFactory(new PrismaMemoryRepository())
    const getMemory = factory.getMemory()

    return await check(
      await getMemory.execute({ memoryId: params.id, userId: req.user.sub }),
      async ({ memory }) => {
        return reply
          .status(STATUS_CODES.SUCCESS.OK)
          .send({ memory: MemoryMapper.toHttp(memory) })
      },
      async ({ message, statusCode }) => {
        return reply.status(statusCode).send({ error: message })
      },
    )
  }

  async listMemory(req: FastifyRequest, reply: FastifyReply) {
    const queryParams = req.query as PaginationParams
    const factory = new MemoryFactory(new PrismaMemoryRepository())
    const listMemory = factory.listMemory()

    return await check(
      await listMemory.execute({
        userId: req.user.sub,
        page: queryParams.page ? +queryParams.page : 1,
        perPage: queryParams.perPage ? +queryParams.perPage : 10,
      }),
      async ({ memories }) => {
        const data = memories.data.map(MemoryMapper.toHttp)
        return reply
          .status(STATUS_CODES.SUCCESS.OK)
          .send({ meta: memories.meta, data })
      },
      async ({ message }) => {
        return reply.status(500).send({ error: message })
      },
    )
  }

  async updateMemory(req: FastifyRequest, reply: FastifyReply) {
    const body = req.body as UpdateMemoryBody
    const params = req.params as UpdateMemoryParams
    const factory = new MemoryFactory(new PrismaMemoryRepository())
    const useCase = factory.updateMemory()

    return await check(
      await useCase.execute({
        ...body,
        memoryId: params.id,
        userId: req.user.sub,
      }),
      async () => {
        return reply.status(STATUS_CODES.SUCCESS.NO_CONTENT).send()
      },
      async ({ message, statusCode }) => {
        return reply.status(statusCode).send({ error: message })
      },
    )
  }
}
