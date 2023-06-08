import { AxiosError } from 'axios'

import { api } from '../../../lib'
import { Memory, MemoryProps } from '../../models/memory'
import { left, right } from '../../types/either'
import { PaginationParams, PaginationResult } from '../../types/pagination'
import {
  CreateParams,
  CreateResult,
  FindAllResult,
  MemoryRepository,
} from '../memory-repository'
import { BadRequest } from '../../errors/bad-request'
import { UnexpectedError } from '../../errors/unexpected-error'

export class HttpMemoryRepository implements MemoryRepository {
  async create(params: CreateParams): Promise<CreateResult> {
    try {
      await api.post('/api/memories', params)
      return right(null)
    } catch (error) {
      if (error instanceof AxiosError) {
        return left(new BadRequest())
      }

      return left(new UnexpectedError())
    }
  }

  async findAll(options: PaginationParams): Promise<FindAllResult> {
    try {
      const { data: responseData } = await api.get<
        PaginationResult<MemoryProps[]>
      >('/api/memories', { params: options })
      const meta = responseData.meta
      const data = responseData.data.map((i) => Memory.create(i))
      const result: PaginationResult<Memory[]> = {
        meta,
        data,
      }
      return right(result)
    } catch (error) {
      if (error instanceof AxiosError) {
        return left(new BadRequest())
      }

      return left(new UnexpectedError())
    }
  }
}
