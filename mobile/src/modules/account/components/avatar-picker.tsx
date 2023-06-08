import { Plus } from 'lucide-react-native'
import { styled } from 'nativewind'
import React from 'react'
import { Image, Pressable } from 'react-native'

export type AvatarPickerProps = {
  onPick?: () => void
  imageUri?: string
}

const PlusImage = styled(Plus)

export const AvatarPicker = (props: AvatarPickerProps) => {
  return (
    <Pressable
      onPress={props.onPick}
      className="w-32 h-32 rounded-full bg-gray-500 items-center justify-center border border-dashed border-gray-100 overflow-hidden"
    >
      {props.imageUri ? (
        <Image className="w-32 h-32" source={{ uri: props.imageUri }} alt="" />
      ) : (
        <PlusImage width={32} height={32} className="text-gray-100" />
      )}
    </Pressable>
  )
}
