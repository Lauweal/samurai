import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { WebView } from 'react-native-webview'
import { NavigatorParamList } from 'apps/samurai/src/navigators'
import { Screen } from 'apps/samurai/src/components'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { palette } from '@samurai/design'


const styles = StyleSheet.create({
  webviewBox: {
    flex: 1,
    backgroundColor: palette.bg,
    position: 'relative',
  },
  mask: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  webview: {
    flex: 1,
    backgroundColor: palette.bg
  }
})

export const WebBox: FC<NativeStackScreenProps<NavigatorParamList, 'WebBox'>> = observer(function WebBox({ navigation, route }) {
  const renderLoading = () => {
    return (<ActivityIndicator style={styles.mask} size="large" color="#355deb" animating hidesWhenStopped />)
  }

  return (
    <Screen unsafe>
      <View style={styles.webviewBox}>
        <WebView style={styles.webview} source={{ uri: 'http://www.baidu.com' }} renderLoading={renderLoading} startInLoadingState />
      </View>
    </Screen>
  )
})
