import { Session } from '../models/session'

export interface SessionRepository {
  restore(): Session
  save(token: string): void
}
