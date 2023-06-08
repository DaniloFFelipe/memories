import { useEffect } from 'react'
import { LocalSessionRepository } from '../../../core/repositories/local/local-session-repository'
import { useAuth } from '../../../shared/stores/authentication'

const sessionRepo = new LocalSessionRepository()
export function useAuthCheck() {
  const [, setAuth] = useAuth()

  useEffect(() => {
    const session = sessionRepo.restore()

    if (session) {
      setAuth({ session })
    }
  }, [])
}
