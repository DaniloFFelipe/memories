import { FastifyInstance } from 'fastify'
import { userRouter } from './user'
import { memoryRouter } from './memory'
import { uploadRoutes } from './uploads'

export async function router(app: FastifyInstance) {
  app.register(userRouter, { prefix: '/users' })
  app.register(memoryRouter, { prefix: '/memories' })
  app.register(uploadRoutes, { prefix: '/upload' })
}
