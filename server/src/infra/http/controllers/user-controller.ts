import { FastifyReply, FastifyRequest } from 'fastify'

import { UserFactory } from '@/infra/factories/user-factory'
import { PrismaUserRepository } from '../../repositories'
import { AuthenticationParams, SignUpParams } from '../validators/schemas'
import { STATUS_CODES, check } from '@/core'

export class UserController {
  async auth(req: FastifyRequest, reply: FastifyReply) {
    const params = req.body as AuthenticationParams
    const userFactory = new UserFactory(new PrismaUserRepository())
    const authentication = userFactory.authentication()

    return await check(
      await authentication.execute(params),
      async ({ user }) => {
        const token = await reply.jwtSign({ sub: user.id.toValue() })
        return reply.status(STATUS_CODES.SUCCESS.OK).send({ token })
      },
      async (error) => {
        return reply.status(error.statusCode).send({ error: error.message })
      },
    )
  }

  async signUp(req: FastifyRequest, reply: FastifyReply) {
    const params = req.body as SignUpParams

    const userFactory = new UserFactory(new PrismaUserRepository())
    const signUp = userFactory.signUp()

    return await check(
      await signUp.execute(params),
      async ({ user }) => {
        const token = await reply.jwtSign({ sub: user.id.toValue() })
        return reply.status(STATUS_CODES.SUCCESS.CREATED).send({ token })
      },
      async (error) => {
        return reply.status(error.statusCode).send({ error: error.message })
      },
    )
  }
}
