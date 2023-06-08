import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router'
import { useAppFonts } from '../src/shared/hooks/use-app-fonts'
import { RecoilRoot } from 'recoil'
import { useIsAuthenticated } from '../src/shared/stores/authentication'
import { useEffect } from 'react'
import { QueryProvider } from '../src/lib/react-query'
import { StatusBar } from 'expo-status-bar'

export default function Layout() {
  const [isFontsReady] = useAppFonts()

  if (!isFontsReady) {
    return <SplashScreen />
  }

  return (
    <QueryProvider>
      <RecoilRoot>
        <StatusBar style="light" translucent />
        <Pages />
      </RecoilRoot>
    </QueryProvider>
  )
}

export const Pages = () => {
  const isAuth = useIsAuthenticated()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    const inAuthGroup = segments[0] === 'home'

    if (!isAuth && inAuthGroup) {
      router.replace('/')
    } else if (isAuth && !inAuthGroup) {
      router.replace('/home')
    }
  }, [isAuth, router, segments])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      <Stack.Screen name="register" options={{ presentation: 'modal' }} />
      <Stack.Screen name="home/index" />
      <Stack.Screen name="home/new" />
    </Stack>
  )
}
