import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BridgeEventType, createBridge, IBridge, Message, MessageEvent } from "@samurai/bridge";
import { useCallback, useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import * as Haptics from 'expo-haptics'
import { NavigatorParamList } from "apps/soratani/app/navigators";
import { injectedJavaScriptCode } from "./JavaScriptCode";


export function useWebView(native: NativeStackScreenProps<NavigatorParamList, 'WebBox' | 'Protocol'>) {
  const web = useRef<WebView>()
  const bridge = useRef<IBridge>()
  const inset = useSafeAreaInsets()
  const progress = useRef(new Animated.Value(0))
  const animated = useRef(Animated.loop(Animated.timing(progress.current, {
    toValue: 1,
    duration: 2000,
    delay: 0,
    easing: Easing.linear,
    useNativeDriver: false
  })))
  const code = injectedJavaScriptCode(inset, native.route.params?.token)
  const startAnimation = () => {
    animated.current.start();
  }

  const stopAnimation = () => {
    animated.current.stop();
    animated.current.reset();
  }

  const onMessage = useCallback((events: WebViewMessageEvent) => {
    const { event, type, method, payload } = JSON.parse(events.nativeEvent.data)
    if (web.current && type === MessageEvent.request) {
      return web.current.injectJavaScript(`window.${event}(${JSON.stringify({ event, method, type: MessageEvent.response, payload })})`)
    }
    if (type === MessageEvent.response) {
      return bridge.current!.publish({ event, type, method, payload })
    }
  }, [web.current])

  const call = useCallback((method: BridgeEventType, payload?: any) => {
    bridge.current?.send(method, payload)
  }, [bridge.current])


  const goBack = (data: Message) => {
    native.navigation.goBack();
  }

  const shake = (data: Message) => {
    const { payload } = data
    if (payload === 'BUTTON') {
      Haptics.selectionAsync()
    }
  }

  useEffect(() => {
    bridge.current = createBridge(web.current)
    bridge.current!.subscription('BACK', goBack)
    bridge.current!.subscription('SHAKE', shake)

    return () => {
      stopAnimation();
      if (web.current) {
        (web.current as any).clearCache();
        (web.current as any).clearHistory();
        (web.current as any) = null;
      }
    }
  }, [web.current])
  return { web, progress, code, call, onMessage, startAnimation, stopAnimation }
}
