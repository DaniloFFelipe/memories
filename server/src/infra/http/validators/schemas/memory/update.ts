import { z } from 'zod'

export const updateMemoryBodySchema = z.object({
  description: z.string().optional(),
  isPublic: z.boolean().optional(),
  coverUrl: z.string().url().optional(),
})

export const updateMemoryParamsSchema = z.object({
  id: z.string().uuid(),
})

export type UpdateMemoryBody = z.infer<typeof updateMemoryBodySchema>
export type UpdateMemoryParams = z.infer<typeof updateMemoryParamsSchema>
