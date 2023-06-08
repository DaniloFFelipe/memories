import React from 'react'
import { View } from 'react-native'
import { styled } from 'nativewind'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AtSign as AtSignIcon, Lock, User2 } from 'lucide-react-native'

import { Background, Button, Input } from '../../../shared/components'
import { AvatarPicker, AccountHeader } from '../components'
import { useRegister } from '../hooks'
import { Controller } from 'react-hook-form'

const AtSign = styled(AtSignIcon)

export function Register() {
  const { bottom } = useSafeAreaInsets()
  const {
    avatar,
    formController,
    handlePickImage,
    handleSubmit,
    isSubmitting,
  } = useRegister()

  return (
    <Background noStripes>
      <AccountHeader>Cadastro</AccountHeader>

      <View
        style={{ marginBottom: bottom }}
        className="flex-1 items-center justify-center mt-6 p-4"
      >
        <AvatarPicker imageUri={avatar} onPick={handlePickImage} />

        <View className="h-12" />

        <Controller
          control={formController}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              icon={<User2 className="text-gray-100" />}
              placeholder="Nome"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />

        <View className="h-4" />
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
          className="mt-auto self-end"
          onTap={handleSubmit}
        >
          Cadastar
        </Button>
      </View>
    </Background>
  )
}
