import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { NavigatorParamList } from 'apps/samurai/src/navigators'
import { Screen } from 'apps/samurai/src/components'
import { observer } from 'mobx-react-lite'
import LottieLoader from 'react-native-lottie-loader'
import { StyleSheet, View, Platform } from 'react-native'
import { palette } from '@samurai/design'
import { Subscription, SubscriptionType } from '@samurai/bridge'


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
  const [loading, setLoading] = useState(false)

  const renderLoading = useMemo(() => {
    return () => {
      console.log(loading);
      return (
        <LottieLoader
          visible={loading}
          autoSize
          animationType="fade"
          speed={1}
          style={styles.mask}
          source={require('./loading.json')}
        />
      )
    }
  }, [loading])

  const jsCode = `
    (function(){
      window.isRN = true;
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
      const back = window.history.back
      window.history.back = function() {
        if (!window.history.state || !window.history.state.key) {
          window.bridge('back').then((res) => { console.log(res) })
          console.log('1')
        }
      }

    })();
  `
  const onMessage = (events: WebViewMessageEvent) => {
    const { event, method, payload } = JSON.parse(events.nativeEvent.data)
    if (web.current) {
      web.current.injectJavaScript(`window.${event}(${JSON.stringify({ event, method, payload })})`)
    }
    if (method == 'back') {
      navigation.goBack();
      setLoading(false);
      // (web.current as any).clearCache();
      // (web.current as any).clearHistory();
      // (web.current as any).componentWillUnmount();
      // (web.current as any) = null
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
        {loading && (<LottieLoader
          visible={loading}
          autoSize
          animationType="fade"
          speed={1}
          style={styles.mask}
          source={require('./loading.json')}
        />)}
        <WebView
          ref={web as any}
          style={styles.webview}
          injectedJavaScript={jsCode}
          onMessage={onMessage}
          onLoadStart={() => { setLoading(true) }}
          onLoadEnd={() => {
            setLoading(false)
            console.log('end')
          }}
          source={{ uri: 'http://127.0.0.1:4200' }}
        // renderLoading={renderLoading}
        // startInLoadingState
        />
      </View>
    </Screen>
  )
})
