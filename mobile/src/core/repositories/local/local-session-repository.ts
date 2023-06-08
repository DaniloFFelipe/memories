import { AppStorage, StorageKeys } from '../../../lib/mmkv'
import { Session } from '../../models/session'
import { SessionRepository } from '../session-repository'

export class LocalSessionRepository implements SessionRepository {
  restore(): Session | null {
    const token = AppStorage.getString(StorageKeys.TOKEN)
    if (!token) {
      return null
    }

    return Session.create({
      token,
    })
  }

  save(token: string): void {
    AppStorage.saveString(StorageKeys.TOKEN, token)
  }
}
