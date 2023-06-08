import { FastifyInstance } from 'fastify'
import { UserController } from '../controllers'
import { ZodValidator } from '../validators'
import { authenticationSchema, signupSchema } from '../validators/schemas'
import { validate } from '../middleware'

const userController = new UserController()
export async function userRouter(app: FastifyInstance) {
  app.post(
    '/auth',
    {
      preHandler: [validate(new ZodValidator(authenticationSchema))],
    },
    userController.auth,
  )
  app.post(
    '/sign-up',
    {
      preHandler: [validate(new ZodValidator(signupSchema))],
    },
    userController.signUp,
  )
}
