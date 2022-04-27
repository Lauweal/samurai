import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { NavigatorParamList } from 'apps/samurai/app/navigators'
import { Screen } from 'apps/samurai/app/components'
import { observer } from 'mobx-react-lite'
import LottieLoader from 'lottie-react-native'
import { StyleSheet, View, Platform, Animated, Easing } from 'react-native'
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
  loader: {
    width: 100,
    height: 100
  },
  webview: {
    flex: 1,
    backgroundColor: palette.bg
  }
})

export const WebBox: FC<NativeStackScreenProps<NavigatorParamList, 'WebBox'>> = observer(function WebBox({ navigation, route }) {
  const web = useRef<WebView>()
  const inset = useSafeAreaInsets()
  const progress = useRef(new Animated.Value(0))
  const animated = useRef(Animated.loop(Animated.timing(progress.current, {
    toValue: 1,
    duration: 2000,
    delay: 0,
    easing: Easing.linear,
  })))
  const [loading, setLoading] = useState(false)

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
  }, [loading])

  const startAnimation = () => {
    animated.current.start();
  }

  const stopAnimation = () => {
    animated.current.stop();
  }

  const onMessage = (events: WebViewMessageEvent) => {
    const { event, method, payload } = JSON.parse(events.nativeEvent.data)
    if (web.current) {
      web.current.injectJavaScript(`window.${event}(${JSON.stringify({ event, method, payload })})`)
    }
    if (method == BridgeEvent.BACK) {
      setLoading(false);
      navigation.pop();
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
      stopAnimation();
      (web.current as any).clearCache();
      (web.current as any).clearHistory();
      (web.current as any).componentWillUnmount();
      (web.current as any) = null;
    }
  }, [])
  console.log(loading)
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
          source={{ uri: 'http://192.168.2.3:4200' }}
          onLoadStart={startAnimation}
          onLoadEnd={stopAnimation}
          renderLoading={renderLoading}
          startInLoadingState
        />
      </View>
    </Screen>
  )
})
