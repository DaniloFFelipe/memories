import { View } from 'react-native'
import { ArrowLeft } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Logo from '../../../shared/assets/logo.svg'
import { Button } from '../../../shared/components'

export const NewHeader = () => {
  const { top } = useSafeAreaInsets()
  const { back } = useRouter()

  const goBack = () => {
    back()
  }

  return (
    <View
      style={{ marginTop: top }}
      className="w-full flex-row items-center justify-between"
    >
      <Logo />

      <View className="flex-row items-center">
        <Button
          onTap={goBack}
          className="w-11"
          contentClassName="bg-purple-500"
        >
          <ArrowLeft className="text-gray-100" />
        </Button>
      </View>
    </View>
  )
}
