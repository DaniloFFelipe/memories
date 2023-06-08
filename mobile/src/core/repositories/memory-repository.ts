import { AppErrors } from '../errors/app-errors'
import { Memory } from '../models/memory'
import { Either } from '../types/either'
import { PaginationParams, PaginationResult } from '../types/pagination'

export type FindAllResult = Either<AppErrors, PaginationResult<Memory[]>>
export type CreateResult = Either<AppErrors, null>

export type CreateParams = {
  coverUrl: string
  description: string
  isPublic: boolean
}

export interface MemoryRepository {
  findAll(options: PaginationParams): Promise<FindAllResult>
  create(params: CreateParams): Promise<CreateResult>
}
