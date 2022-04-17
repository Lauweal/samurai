import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { NavigatorParamList } from 'apps/samurai/src/navigators'
import { Screen } from 'apps/samurai/src/components'
import { observer } from 'mobx-react-lite'
import LottieLoader from 'react-native-lottie-loader'
import { StyleSheet, View, Platform } from 'react-native'
import { getDevice } from 'react-native-device-info'
import { palette } from '@samurai/design'
import { BridgeEvent, Subscription, SubscriptionType } from '@samurai/bridge'
import { initialJsCode } from './initial';


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
  webview: {
    flex: 1,
    backgroundColor: palette.bg
  }
})

export const WebBox: FC<NativeStackScreenProps<NavigatorParamList, 'WebBox'>> = observer(function WebBox({ navigation, route }) {
  const web = useRef<WebView>()
  const inset = useSafeAreaInsets()
  const [loading, setLoading] = useState(false)

  const renderLoading = useCallback(() => {
    return (
      <LottieLoader
        visible
        autoSize
        animationStyle={{ width: 150, height: 150 }}
        animationType="fade"
        speed={1}
        style={styles.mask}
        source={require('./loading.json')}
      />
    )
  }, [loading])

  const onMessage = (events: WebViewMessageEvent) => {
    const { event, method, payload } = JSON.parse(events.nativeEvent.data)
    if (web.current) {
      web.current.injectJavaScript(`window.${event}(${JSON.stringify({ event, method, payload })})`)
    }
    if (method == BridgeEvent.BACK) {
      navigation.goBack();
      setLoading(false);
    }

    if (method === BridgeEvent.OPEN_MODAL) {

    }
  }

  const call = (event: SubscriptionType, payload?: any) => {
    if (web.current) {
      web.current.postMessage(JSON.stringify({
        event,
        payload: payload || {}
      }))
    }
  }

  useEffect(() => {
    return () => {
      (web.current as any).clearCache();
      (web.current as any).clearHistory();
      (web.current as any).componentWillUnmount();
      (web.current as any) = null
    }
  }, [])

  return (
    <Screen unsafe>
      <View style={styles.webviewBox}>
        <WebView
          ref={web as any}
          style={styles.webview}
          injectedJavaScript={initialJsCode(inset)}
          javaScriptEnabled={true}
          originWhitelist={['https://*', 'git://*', 'http://*']}
          onMessage={onMessage}
          onLoadStart={() => { setLoading(true) }}
          onLoadEnd={() => {
            setLoading(false)
          }}
          source={{ uri: 'http://127.0.0.1:4200' }}
          renderLoading={renderLoading}
          startInLoadingState
        />
      </View>
    </Screen>
  )
})
