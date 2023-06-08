import { ReactNode, useMemo } from 'react'
import { ClassNameProps } from './props'
import { ActivityIndicator, Pressable, Text } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export type ButtonProps = ClassNameProps & {
  onTap?: () => void
  children: ReactNode | string
  loading?: boolean
  contentClassName?: string
}

export const Button = ({
  onTap,
  className,
  contentClassName,
  children,
  loading = false,
}: ButtonProps) => {
  const scale = useSharedValue(1)
  const animation = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  function onPressIn() {
    scale.value = withTiming(0.97, {
      duration: 100,
      easing: Easing.linear,
    })
  }

  function onPressOut() {
    scale.value = withTiming(1, {
      duration: 100,
      easing: Easing.linear,
    })
  }

  const Children = useMemo(() => {
    if (typeof children === 'string') {
      return <Text className="font-alt text-gray-900 text-xl">{children}</Text>
    }

    return <>{children}</>
  }, [children])

  return (
    <Pressable
      className={`w-full ${className}`}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onTap}
    >
      <Animated.View
        className={`w-full h-11 items-center justify-center rounded-full bg-green-500 ${contentClassName}`}
        style={[animation, { width: '100%' }]}
      >
        {loading ? <ActivityIndicator color="#121215" /> : <>{Children}</>}
      </Animated.View>
    </Pressable>
  )
}
