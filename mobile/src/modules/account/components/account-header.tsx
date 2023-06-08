import React from 'react'
import { Pressable, View } from 'react-native'
import { styled } from 'nativewind'
import { useRouter } from 'expo-router'
import { X } from 'lucide-react-native'

import { Heading } from '../../../shared/components'

export type HeaderProps = {
  children?: string
}

const XClose = styled(X)

export function AccountHeader(props: HeaderProps) {
  const { back } = useRouter()

  function onClose() {
    back()
  }

  return (
    <View className="w-full h-16 items-center justify-center">
      <Heading>{props.children}</Heading>

      <Pressable onPress={onClose} className="absolute left-6">
        <XClose className="text-gray-100" />
      </Pressable>
    </View>
  )
}
