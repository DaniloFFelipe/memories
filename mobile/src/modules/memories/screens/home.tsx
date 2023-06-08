import { View } from 'react-native'
import { Background } from '../../../shared/components'

import { HomeHeader } from '../components/home-header'
import { MemoriesList } from '../components/memories-list'
import { withAuth } from '../../../shared/components/hoc/auth'

export const Home = withAuth(() => {
  return (
    <Background className="flex-1">
      <View className="px-6">
        <HomeHeader />
      </View>

      <View className="flex-1 pt-4">
        <MemoriesList />
      </View>
    </Background>
  )
})
