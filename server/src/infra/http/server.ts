import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { resolve } from 'node:path'

import { EnterpriseError } from '@/domain/enterprise'

import { env } from '../env'
import { app } from '../lib'
import { router } from './routes'

export async function bootstrap() {
  try {
    await app.register(multipart)
    await app.register(require('@fastify/static'), {
      root: resolve(__dirname, '../uploads'),
      prefix: '/uploads',
    })
    await app.register(fastifyJwt, {
      secret: env.JWT_SECRET,
    })

    await app.register(router, { prefix: '/api' })

    app.setErrorHandler((err, _, reply) => {
      if (err instanceof EnterpriseError) {
        return reply.status(400).send({ error: err.message })
      }

      return reply.status(500).send({ error: 'internal-error' })
    })

    await app.listen({
      port: env.PORT,
      host: '0.0.0.0',
    })
    console.log(`Server running on port: ${env.PORT}`)
  } catch (error) {
    console.error(error)
  }
}
