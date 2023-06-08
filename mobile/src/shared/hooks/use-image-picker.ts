import * as ImagePicker from 'expo-image-picker'
import { useCallback, useState } from 'react'

export function useImagePicker() {
  const [image, setImage] = useState<string | null>(null)
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()

  const pickImage = useCallback(async () => {
    if (status.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      })

      if (!result.canceled) {
        setImage(result.assets[0].uri)
      }
    }
  }, [status])

  return [image, pickImage, requestPermission, status] as const
}
