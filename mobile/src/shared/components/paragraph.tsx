import { ReactNode } from 'react'
import { Text } from 'react-native'

export interface ParagraphProps {
  children?: ReactNode
  className?: string
}

export function Paragraph({ children, className }: ParagraphProps) {
  return (
    <Text
      className={`font-body text-gray-100 text-lg ${!!className && className}`}
    >
      {children}
    </Text>
  )
}
