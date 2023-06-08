import { z } from 'zod'

export const createMemorySchema = z.object({
  description: z.string().max(255),
  isPublic: z.boolean().default(false),
  coverUrl: z.string().url(),
})

export type CreateMemoryParams = z.infer<typeof createMemorySchema>
