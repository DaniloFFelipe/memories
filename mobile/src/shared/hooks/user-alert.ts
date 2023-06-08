import { useCallback } from 'react'
import { Alert } from 'react-native'
import { AppErrors } from '../../core/errors/app-errors'
import { UnexpectedError } from '../../core/errors/unexpected-error'
import { InvalidCredentials } from '../../core/errors/invalid-credentials'

export type ShowAlertProps = {
  title: string
  subtitle: string
}
export const useAlert = () => {
  const showAlert = useCallback(({ title, subtitle }: ShowAlertProps) => {
    Alert.alert(title, subtitle)
  }, [])

  const showError = useCallback((error: AppErrors) => {
    let subtitle = 'Erro Interno'
    let title = 'Erro'

    if (error instanceof UnexpectedError) {
      subtitle = 'UnexpectedError'
      title = 'Erro'
    }

    if (error instanceof InvalidCredentials) {
      subtitle = 'InvalidCredentials'
      title = 'Erro'
    }

    Alert.alert(title, subtitle)
  }, [])

  return { showAlert, showError }
}
