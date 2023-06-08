import { useFonts } from '@expo-google-fonts/roboto'

import { APP_FONTS } from '../styles/fonts'

export function useAppFonts() {
  return useFonts(APP_FONTS)
}
