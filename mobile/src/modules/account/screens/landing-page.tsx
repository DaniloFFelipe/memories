import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  Background,
  Button,
  Heading,
  Paragraph,
} from '../../../shared/components'
import Logo from '../../../shared/assets/logo.svg'
import { Link, useRouter } from 'expo-router'
import { useAuthCheck } from '../hooks/use-auth-check'

export function LandingPage() {
  useAuthCheck()

  const { bottom } = useSafeAreaInsets()
  const { push } = useRouter()

  function goToLogin() {
    push('/login')
  }

  return (
    <Background className="flex-1 items-center justify-center px-6">
      <Logo />

      <Heading className="mt-4">Sua cápsula do tempo</Heading>
      <Paragraph className="text-center mt-2">
        Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
        com o mundo!
      </Paragraph>

      <Button onTap={goToLogin} className="max-w-xs mt-4">
        COMEÇAR A CADASTRAR
      </Button>

      <View
        style={{ marginBottom: bottom }}
        className="absolute bottom-0 flex-row"
      >
        <Paragraph>Não possui uma conta? </Paragraph>

        <Link href={'/register'}>
          <Paragraph className="text-purple-500"> Cadastre-se agora!</Paragraph>
        </Link>
      </View>
    </Background>
  )
}
