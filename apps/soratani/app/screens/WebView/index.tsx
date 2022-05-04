import React, { FC, useCallback, useEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { WebView } from 'react-native-webview'
import { NavigatorParamList } from 'apps/soratani/app/navigators'
import { Screen } from 'apps/soratani/app/components'
import { observer } from 'mobx-react-lite'
import LottieLoader from 'lottie-react-native'
import { StyleSheet, View } from 'react-native'
import { palette } from '@samurai/design'
import { useStores } from 'apps/soratani/app/models'
import { environment } from 'apps/soratani/app/environments/environment';
import { useWebView } from './useWebview';


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
    justifyContent: 'center',
    backgroundColor: palette.bg
  },
  loader: {
    width: 100,
    height: 100
  },
  webview: {
    flex: 1,
    backgroundColor: palette.bg
  }
})

export const WebBox: FC<NativeStackScreenProps<NavigatorParamList, 'WebBox'>> = observer(function WebBox(props) {
  const { web, progress, code, startAnimation, stopAnimation, call, onMessage, } = useWebView(props)
  const { account } = useStores()

  useEffect(() => {
    account.reloadToken()
  }, [])

  const renderLoading = useCallback(() => {
    return (
      <View style={styles.mask}>
        <LottieLoader
          autoPlay
          loop
          speed={1}
          progress={progress.current}
          style={styles.loader}
          source={require('./loading.json')}
        />
      </View>
    )
  }, [progress.current])
  return (
    <Screen unsafe preset="fixed">
      <View style={styles.webviewBox}>
        <WebView
          ref={web as any}
          style={styles.webview}
          injectedJavaScript={code}
          javaScriptEnabled={true}
          originWhitelist={['https://*', 'git://*', 'http://*']}
          onMessage={onMessage}
          source={{ uri: environment.webview }}
          onLoadStart={startAnimation}
          onLoadEnd={stopAnimation}
          renderLoading={renderLoading}
          startInLoadingState
        />
      </View>
    </Screen>
  )
})
