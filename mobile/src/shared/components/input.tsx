import { Pressable, TextInput, TextInputProps, View } from 'react-native'
import { ClassNameProps } from './props'
import { ReactNode, useState } from 'react'
import { styled } from 'nativewind'
import { Eye, EyeOff } from 'lucide-react-native'
import clsx from 'clsx'

export type InputProps = ClassNameProps &
  TextInputProps & {
    icon?: ReactNode
  }

const ShowPasswordIcon = styled(Eye)
const NotShowPasswordIcon = styled(EyeOff)

export function Input({
  className,
  icon,
  secureTextEntry: isSecure = false,
  ...props
}: InputProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(isSecure)

  function toggleShowEntry() {
    setSecureTextEntry((state) => !state)
  }

  const SecureIcon = !secureTextEntry ? ShowPasswordIcon : NotShowPasswordIcon
  return (
    <View
      className={`w-full h-14 flex-row items-center rounded-lg border border-gray-500 bg-gray-900 px-4`}
    >
      {!!icon && icon}
      <TextInput
        className={clsx('flex-1 text-gray-100 text-lg', {
          'ml-4': !!icon,
          'mr-4': !!isSecure,
        })}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={'#bebebf'}
        {...props}
      />
      {isSecure && (
        <Pressable onPress={toggleShowEntry}>
          <SecureIcon className="text-gray-100" />
        </Pressable>
      )}
    </View>
  )
}
