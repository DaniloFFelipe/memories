/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { View, Pressable, PressableProps } from 'react-native'
import { ChildrenProps, Paragraph } from '../../../shared/components'
import { Image as EXImage } from 'expo-image'
import { blurHash } from '../../../shared/contants/blur-image'
import { ArrowRight } from 'lucide-react-native'

function Header({ children }: ChildrenProps) {
  return (
    <View className="ml-[-24px] flex-row items-center">
      <View className="h-[1px] w-6 bg-gray-100 rounded-full mr-4" />
      <Paragraph>{children}</Paragraph>
    </View>
  )
}

function Image({ image }: { image: string }) {
  return (
    <EXImage
      className="w-full h-36 rounded mt-4"
      source={image}
      placeholder={blurHash}
      contentFit="cover"
      transition={1000}
    />
  )
}

function Content({ children, ...rest }: ChildrenProps & PressableProps) {
  return (
    <Pressable {...rest} className="px-4">
      {children}
    </Pressable>
  )
}

function Body({ children }: ChildrenProps) {
  return <Paragraph className="mt-4">{children}</Paragraph>
}

function ReadMore() {
  return (
    <View className="mt-4 flex-row items-center">
      <Paragraph>Ler mais</Paragraph>
      <ArrowRight className="text-gray-100 ml-2" />
    </View>
  )
}

function Card({ children }: ChildrenProps) {
  return <View className="w-full px-6">{children}</View>
}

export const Memory = {
  Header,
  Image,
  Body,
  ReadMore,
  Card,
  Content,
}
