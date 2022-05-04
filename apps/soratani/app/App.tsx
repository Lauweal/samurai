import React, { useEffect, useState } from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import * as storage from 'apps/soratani/app/utils/storage';
import * as Font from 'expo-font';
import {
  AppNavigator,
  useNavigationPersistence,
  navigationRef
} from 'apps/soratani/app/navigators';
import {
  RootStore,
  RootStoreProvider,
  setupRootStore,
} from 'apps/soratani/app/models';
import { fontsAssets } from '@samurai/design';
import * as Sentry from 'sentry-expo'
import { RewriteFrames } from '@sentry/integrations';
import { BrowserTracing } from '@sentry/tracing'
import { Notification } from './components';

const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation()
Sentry.init({
  enabled: true,
  dsn: 'https://fd4e4687cfb64c848c466f707f7c0d07@o937351.ingest.sentry.io/6378017',
  enableInExpoDevelopment: true,
  release: '0.0.0',
  enableNativeNagger: true,
  debug: true,
  sendClientReports: true,
  maxCacheItems: 40,
  tracesSampleRate: 1.0,
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 5000,
  attachStacktrace: true,
  integrations: [
    // new RewriteFrames({
    //   iteratee: (frame) => {
    //     console.log(frame)
    //     // if (frame.filename && frame.filename !== '[native code]') {
    //     //   frame.filename =
    //     //     Platform.OS === 'android' ? 'app:///index.android.bundle' : 'app:///main.jsbundle';
    //     // }
    //     return frame;
    //   },
    // }),
    new Sentry.Native.ReactNativeTracing({
      enableAppStartTracking: true,
      enableNativeFramesTracking: true,
      enableStallTracking: true,
      idleTimeout: 5000,
      routingInstrumentation,
      tracingOrigins: ['localhost', /^\//, /^http:\/\//],
    })
  ]
})

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);
  useEffect(() => {
    (async () => {
      await Font.loadAsync(fontsAssets);
      setupRootStore().then(setRootStore);
    })();
  }, []);
  if (!rootStore || !isNavigationStateRestored) return null;
  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Notification>
          <AppNavigator
            onReady={() => {
              routingInstrumentation.registerNavigationContainer(navigationRef)
            }}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </Notification>
      </SafeAreaProvider>
    </RootStoreProvider>
  );
}

export default Sentry.Native.wrap(App);
