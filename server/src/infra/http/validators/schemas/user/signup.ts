import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  pictureUrl: z.string().url(),
})

export type SignUpParams = z.infer<typeof signupSchema>
