export interface PaginationParams {
  page: Number
  perPage: Number
}

export type PaginationResult<R> = {
  meta: PaginationParams & { total: number }
  data: R
}
