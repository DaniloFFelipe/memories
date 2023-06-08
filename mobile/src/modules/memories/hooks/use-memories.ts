import { useCallback, useEffect, useState } from 'react'
import { Memory } from '../../../core/models/memory'
import { MemoryFactory } from '../../../core/factories/memory-factory'

const listAllMemories = MemoryFactory.listAllMemories()
export function useMemories() {
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(-1)
  const [memories, setMemories] = useState<Memory[]>([])

  useEffect(() => {
    listAllMemories.execute({ page }).then((result) => {
      if (total !== memories.length) {
        if (result.isRight()) {
          setMemories((s) => [...s, ...result.value.data])

          if (total !== result.value.meta.total) {
            setTotal(total)
          }
        }
      }
    })
  }, [page])

  const onNextPage = useCallback(() => {
    setPage((p) => p + 1)
  }, [])

  return {
    memories,
    onNextPage,
    total,
  }
}
