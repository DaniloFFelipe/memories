import { Pressable, View } from 'react-native'
import { styled } from 'nativewind'
import { AtSign as AtSignIcon, Lock, X } from 'lucide-react-native'

import { Background, Button, Heading, Input } from '../../../shared/components'
import { useRouter } from 'expo-router'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLogin } from '../hooks'
import { Controller } from 'react-hook-form'

const XClose = styled(X)
const AtSign = styled(AtSignIcon)

export function Login() {
  const { back } = useRouter()
  const { bottom } = useSafeAreaInsets()
  const { formController, handleSubmit, isSubmitting } = useLogin()

  function onClose() {
    back()
  }

  return (
    <Background noStripes>
      <View className="w-full h-16 items-center justify-center">
        <Heading>Login</Heading>

        <Pressable onPress={onClose} className="absolute left-6">
          <XClose className="text-gray-100" />
        </Pressable>
      </View>

      <View style={{ marginBottom: bottom }} className="flex-1 mt-6 p-4">
        <Controller
          control={formController}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              icon={<AtSign className="text-gray-100" />}
              placeholder="Email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        <View className="h-4" />
        <Controller
          control={formController}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              icon={<Lock className="text-gray-100" />}
              placeholder="Password"
              secureTextEntry
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        <Button
          loading={isSubmitting}
          onTap={handleSubmit}
          className="mt-auto self-end"
        >
          Entrar
        </Button>
      </View>
    </Background>
  )
}
