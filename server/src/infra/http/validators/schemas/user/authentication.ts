import { z } from 'zod'

export const authenticationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type AuthenticationParams = z.infer<typeof authenticationSchema>
