import { FindByOption, Pagination, PaginationResult } from '@/core'
import { Memory, MemoryCreateProps } from '../../enterprise/entities'

export interface MemoryRepository {
  findBy(options: FindByOption<MemoryCreateProps>): Promise<Memory | null>
  findManyBy(options: FindByOption<MemoryCreateProps>): Promise<Memory[]>
  findManyWhereVisible(
    userId: string,
    options: Pagination,
  ): Promise<PaginationResult<Memory[]>>

  save(memory: Memory): Promise<void>
  create(memory: Memory): Promise<void>
  delete(memoryId: string): Promise<void>
}
