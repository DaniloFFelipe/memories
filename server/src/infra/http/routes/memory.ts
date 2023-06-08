import { FastifyInstance } from 'fastify'
import { MemoryController } from '../controllers'
import { ZodValidator } from '../validators'
import {
  createMemorySchema,
  deleteMemoryParamsSchema,
  getMemoryParamsSchema,
  updateMemoryBodySchema,
  updateMemoryParamsSchema,
} from '../validators/schemas'
import { authenticate, validate } from '../middleware'

const memoryController = new MemoryController()
export async function memoryRouter(app: FastifyInstance) {
  app.addHook('onRequest', authenticate)
  app.post(
    '/',
    {
      preHandler: [validate(new ZodValidator(createMemorySchema))],
    },
    memoryController.createMemory,
  )

  app.get('/', memoryController.listMemory)

  app.get(
    '/:id',
    {
      preHandler: [validate(new ZodValidator(getMemoryParamsSchema), 'params')],
    },
    memoryController.getMemory,
  )

  app.put(
    '/:id',
    {
      preHandler: [
        validate(new ZodValidator(updateMemoryParamsSchema), 'params'),
        validate(new ZodValidator(updateMemoryBodySchema), 'body'),
      ],
    },
    memoryController.updateMemory,
  )

  app.delete(
    '/:id',
    {
      preHandler: [
        validate(new ZodValidator(deleteMemoryParamsSchema), 'params'),
      ],
    },
    memoryController.deleteMemory,
  )
}
