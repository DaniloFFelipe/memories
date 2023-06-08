import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.coerce.number().optional(),
  perPage: z.coerce.number().optional(),
})

export type PaginationParams = z.infer<typeof paginationSchema>
