import { View } from 'react-native'
import { LogOut, Plus } from 'lucide-react-native'

import Logo from '../../../shared/assets/logo.svg'
import { Button } from '../../../shared/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '../../../shared/stores/authentication'
import { useRouter } from 'expo-router'

export const HomeHeader = () => {
  const { top } = useSafeAreaInsets()
  const { push } = useRouter()
  const [, , logout] = useAuth()

  const goToNewPage = () => {
    push('/home/new')
  }

  return (
    <View
      style={{ marginTop: top }}
      className="w-full flex-row items-center justify-between"
    >
      <Logo />

      <View className="flex-row items-center">
        <Button
          onTap={logout}
          className="w-11 mr-4"
          contentClassName="bg-red-700"
        >
          <LogOut className="text-gray-100" />
        </Button>

        <Button onTap={goToNewPage} className="w-11" contentClassName="w-11">
          <Plus className="text-gray-900" />
        </Button>
      </View>
    </View>
  )
}
