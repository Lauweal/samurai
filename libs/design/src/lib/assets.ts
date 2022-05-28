export enum Fonts {
  'Poppins-Black' = 'Poppins-Black',
  'Poppins-Bold' = 'Poppins-Bold',
  'Poppins-SemiBold' = 'Poppins-SemiBold',
  'Poppins-Regular' = 'Poppins-Regular'
}

export type IFontsAssets = Record<keyof typeof Fonts, any>

export const fontsAssets: IFontsAssets = {
  'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
  'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
}


export const webFontsAssets: IFontsAssets = {
  'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf').default,
  'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf').default,
  'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf').default,
  'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf').default,
}

export const imagesAssets = {
  background_01: require('../assets/images/background_01.png'),
  background_02: require('../assets/images/background_02.png'),
  logo_02: require('../assets/images/logo_02.png'),
  logo: require('../assets/images/icon.png'),
  card: require('../assets/images/card.png'),
  vip: require('../assets/images/vip.png'),
  avatar: require('../assets/images/avatar.jpeg')
}

export const iconsAssets = {
  eye_close: require('../assets/icons/eye_close.png'),
  eye: require('../assets/icons/eye.png'),
  cancel: require('../assets/icons/cancel.png'),
  correct: require('../assets/icons/correct.png'),
  error: require('../assets/icons/error.png'),
}
