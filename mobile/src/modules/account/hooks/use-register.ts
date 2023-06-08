import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback } from 'react'

import { useImagePicker } from '../../../shared/hooks/use-image-picker'
import { UserFactory } from '../../../core/factories/user-factory'
import { useAlert } from '../../../shared/hooks/user-alert'
import { useAuth } from '../../../shared/stores/authentication'

const registerFormSchema = z.object({
  name: z.string().min(3),
  password: z.string().min(6),
  email: z.string().email(),
})

type RegisterFormType = {
  name: string
  password: string
  email: string
}

const signUp = UserFactory.signUp()
export const useRegister = () => {
  const [image, getImage, requestPermission, permissionStatus] =
    useImagePicker()

  const {
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  })

  const { showError } = useAlert()
  const [, setAuth] = useAuth()

  const onSubmit = useCallback(
    async (formData: RegisterFormType) => {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const result = await signUp.execute({
        ...formData,
        fileUri: image,
      })

      if (result.isLeft()) {
        showError(result.value)
        return
      }

      reset()

      setAuth({ session: result.value })
    },
    [image, reset, setAuth, showError],
  )

  const pickImage = useCallback(async () => {
    if (!permissionStatus.granted) {
      await requestPermission()
    }

    await getImage()
  }, [permissionStatus, getImage, requestPermission])

  return {
    avatar: image,
    clearForm: reset,
    formController: control,
    isSubmitting,
    hasError: !!errors.root,
    handlePickImage: pickImage,
    handleSubmit: handleSubmit(onSubmit),
  }
}
