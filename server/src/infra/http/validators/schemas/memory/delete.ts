import { z } from 'zod'

export const deleteMemoryParamsSchema = z.object({
  id: z.string().uuid(),
})

export type DeleteMemoryParams = z.infer<typeof deleteMemoryParamsSchema>
