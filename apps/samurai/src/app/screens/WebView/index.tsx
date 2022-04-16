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
    console.log(loading);
    return (
      <LottieLoader
        visible={loading}
        autoSize
        animationType="fade"
        speed={3}
        style={styles.mask}
        source={require('./loading.json')}
      />
    )
  }, [loading])

  const jsCode = `
    (function(){
      window.isRN = true;
      window.StatusBar = ${inset.top >= 30 ? inset.top - 15 : inset.top};
      window.bridge = function(method, payload) {
        const time = new Date().getTime();
        return new Promise((res) => {
          window[method + '_' + time] = function(data) {
            res(data)
            window[method + '_' + time] = null
          }
          window.ReactNativeWebView.postMessage(JSON.stringify(
            {
              event: method + '_' + time,
              method,
              payload
            }
          ))
        });
      };

      window.subscriptionEvents = {}

      if(${JSON.stringify(Platform.OS)} === 'ios') {
        window.addEventListener("message", function(events) {
          if(typeof events.data == 'string' && events.data.includes('event') && events.data.includes('payload')) {
            const {event, payload} = JSON.parse(events.data);
            Object.keys(window.subscriptionEvents).map((e) => {
              if(e.includes(event)) {
                window.subscriptionEvents[e]({ event:e, method:event,  payload })
                if (e.includes('onec') && e.includes(event)) {
                  delete window.subscriptionEvents[e]
                }
              }
            })
          }
        })
      } else {
        document.addEventListener("message", function(events) {
          if(typeof events.data == 'string' && events.data.includes('event') && events.data.includes('payload')) {
            const {event, payload} = JSON.parse(events.data);
            Object.keys(window.subscriptionEvents).map((e) => {
              if(e.includes(event)) {
                window.subscriptionEvents[e]({ event:e,method:event, payload })
                if (e.includes('onec') && e.includes(event)) {
                  delete window.subscriptionEvents[e]
                }
              }
            })
          }
        })
      }
      const go = window.history.go
      window.history.go = (a) => {
        if (!window.history.state || !window.history.state.key) {
          window.bridge('BACK')
        } else {
          go.call(window.history,a)
        }
      }

    })();
  `
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
          injectedJavaScript={jsCode}
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
