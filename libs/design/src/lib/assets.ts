export type IFontsFamily = 'Poppins-Black' | 'Poppins-Bold' | 'Poppins-SemiBold' | 'Poppins-Regular'
export type IFontsAssets = Record<IFontsFamily, any>
export const fontsAssets: IFontsAssets = {
  'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
  'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
  'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
}


export const imagesAssets = {
  background_01: require('../assets/images/background_01.png'),
  background_02: require('../assets/images/background_02.png'),
  logo_02: require('../assets/images/logo_02.png'),
  logo: require('../assets/images/icon.png'),
}
