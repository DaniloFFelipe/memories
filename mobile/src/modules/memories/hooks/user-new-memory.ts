import { useState, useCallback } from 'react'

import { useImagePicker } from '../../../shared/hooks/use-image-picker'
import { MemoryFactory } from '../../../core/factories/memory-factory'
import { useAlert } from '../../../shared/hooks/user-alert'
import { useRouter } from 'expo-router'

const createMemoryService = MemoryFactory.createMemory()
export const useNewMemory = () => {
  const [image, pickImage, requestPermission] = useImagePicker()
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)

  const { back } = useRouter()
  const { showError } = useAlert()

  const handleNewMemory = useCallback(async () => {
    const res = await createMemoryService.execute({
      coverUrl: image,
      description,
      isPublic: true,
    })

    if (res.isLeft()) {
      showError(res.value)
    }

    back()
  }, [image, description])

  const pickCoverMemory = useCallback(async () => {
    await requestPermission()
    await pickImage()
  }, [pickImage, requestPermission])

  return {
    onDescriptionChange: setDescription,
    coverImage: image,
    pickCoverMemory,
    handleNewMemory,
    description,
    isPublic,
    toggleIsPublic: setIsPublic,
  }
}
