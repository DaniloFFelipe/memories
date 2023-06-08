import { ReactNode } from 'react'
import { Text } from 'react-native'

export interface HeadingProps {
  children?: ReactNode
  className?: string
}

export function Heading({ children, className }: HeadingProps) {
  return (
    <Text
      className={`font-title text-gray-50 text-2xl ${!!className && className}`}
    >
      {children}
    </Text>
  )
}
