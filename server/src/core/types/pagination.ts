export type Pagination = {
  perPage: number
  page: number
}

export type PaginationResult<R> = {
  meta: Pagination & { total: number }
  data: R
}
