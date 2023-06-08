/* eslint-disable jsx-a11y/alt-text */
import { Pressable, Switch, TextInput, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ImagePlus } from 'lucide-react-native'

import { Background, Button, Paragraph } from '../../../shared/components'
import { withAuth } from '../../../shared/components/hoc/auth'
import { NewHeader } from '../components/new-header'
import { useNewMemory } from '../hooks/user-new-memory'

export const New = withAuth(() => {
  const {
    coverImage,
    handleNewMemory,
    description,
    onDescriptionChange,
    pickCoverMemory,
    isPublic,
    toggleIsPublic,
  } = useNewMemory()
  const { bottom } = useSafeAreaInsets()

  const handleChooseImage = () => {
    pickCoverMemory()
  }

  return (
    <Background>
      <View className="px-6">
        <NewHeader />
      </View>

      <View
        style={{
          paddingBottom: bottom,
          gap: 24,
        }}
        className="flex-1 pt-4 px-6 mt-6"
      >
        <View className="w-full flex-row items-center justify-between">
          <Paragraph className="text-gray-100">
            Tornar memória pública
          </Paragraph>

          <Switch value={isPublic} onValueChange={toggleIsPublic} />
        </View>

        <Pressable
          onPress={handleChooseImage}
          className="w-full h-32 items-center justify-center border border-gray-500 rounded overflow-hidden"
        >
          {coverImage ? (
            <Image source={{ uri: coverImage }} className="w-full h-full" />
          ) : (
            <View className="flex-row items-center justify-center">
              <ImagePlus
                width={21}
                height={21}
                className="text-gray-100 mr-2"
              />
              <Paragraph className="text-gray-100 text-sm">
                Adicionar foto ou vídeo de capa
              </Paragraph>
            </View>
          )}
        </Pressable>

        <TextInput
          multiline
          value={description}
          onChangeText={onDescriptionChange}
          className="w-full h-32 text-gray-100 text-lg"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa
          experiência que você quer lembrar para sempre."
        />

        <View className="w-full items-center justify-center mt-auto mb-4">
          <Button onTap={handleNewMemory}>Salvar</Button>
        </View>
      </View>
    </Background>
  )
})
