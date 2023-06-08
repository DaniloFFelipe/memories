import { ReactNode } from 'react'
import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'

import BgBlur from '../assets/bg-blur.png'
import Stripes from '../assets/stripes.svg'

const StyledStripes = styled(Stripes)

export interface BackgroundProps {
  children?: ReactNode
  className?: string
  noStripes?: boolean
}

export function Background({
  children,
  className,
  noStripes = false,
}: BackgroundProps) {
  return (
    <ImageBackground
      source={BgBlur}
      className={`relative flex-1 bg-gray-900 ${className ?? ''}`}
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      {!noStripes && <StyledStripes className="absolute left-2" />}
      {children}
    </ImageBackground>
  )
}
