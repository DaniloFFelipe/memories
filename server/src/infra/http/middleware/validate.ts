import { FastifyRequest, FastifyReply } from 'fastify'
import { Validator } from '../validators'

export function validate<Props>(
  validator: Validator<Props>,
  where: 'body' | 'params' | 'query' = 'body',
) {
  return async function (req: FastifyRequest, reply: FastifyReply) {
    const result = await validator.check(req[where])
    if (!result.success) {
      return reply.status(400).send({ error: result.error.message })
    }
  }
}
