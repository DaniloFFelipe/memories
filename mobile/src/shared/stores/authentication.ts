import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

import { Session } from '../../core/models/session'
import { useCallback } from 'react'
import { LocalSessionRepository } from '../../core/repositories/local/local-session-repository'
import { api } from '../../lib'

type AuthProps = {
  session: Session | null
}

const authAtom = atom<AuthProps>({
  key: 'AuthState',
  default: {
    session: null,
  },
})

const sessionSelector = selector({
  key: 'SessionSelector',
  get: ({ get }) => {
    const auth = get(authAtom)

    return auth.session
  },
})

const isAuthSelector = selector({
  key: 'isAuthSelector',
  get: ({ get }) => {
    const auth = get(authAtom)

    return !!auth.session
  },
})

const sessionRepo = new LocalSessionRepository()
export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authAtom)

  const logout = useCallback(() => {
    api.defaults.headers.Authorization = undefined
    sessionRepo.save('')
    setAuth({ session: null })
  }, [])

  const setAuthentication = useCallback(
    (props: AuthProps) => {
      api.defaults.headers.Authorization = 'Bearer ' + props.session.token
      sessionRepo.save(props.session.token)
      setAuth(props)
    },
    [setAuth],
  )

  return [auth, setAuthentication, logout] as const
}

export const useSession = () => useRecoilValue(sessionSelector)
export const useIsAuthenticated = () => useRecoilValue(isAuthSelector)
