/* eslint-disable no-unused-vars */
import { MMKV } from 'react-native-mmkv'

export enum StorageKeys {
  TOKEN = 'TOKEN',
}

export const storage = new MMKV({
  id: '@memories',
})

export const AppStorage = {
  saveString(key: StorageKeys, value: string) {
    storage.set(key, value)
  },
  getString(key: StorageKeys) {
    return storage.getString(key)
  },
}
