import { z } from 'zod'

export const getMemoryParamsSchema = z.object({
  id: z.string().uuid(),
})

export type GetMemoryParams = z.infer<typeof getMemoryParamsSchema>
