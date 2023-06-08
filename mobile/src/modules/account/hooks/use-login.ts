import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { UserFactory } from '../../../core/factories/user-factory'
import { useAuth } from '../../../shared/stores/authentication'

const loginFormSchema = z.object({
  password: z.string().min(6),
  email: z.string().email(),
})

type LoginFormType = {
  password: string
  email: string
}
const authenticate = UserFactory.authentication()

export const useLogin = () => {
  const {
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  })
  const [, setAuth] = useAuth()
  const onSubmit = async (formData: LoginFormType) => {
    const result = await authenticate.execute(formData)

    if (result.isLeft()) {
      Alert.alert('Ops', 'Credenciais inválidas')
      return
    }

    reset()
    setAuth({ session: result.value })
  }

  return {
    clearForm: reset,
    formController: control,
    isSubmitting,
    hasError: !!errors.root,
    handleSubmit: handleSubmit(onSubmit),
  }
}
