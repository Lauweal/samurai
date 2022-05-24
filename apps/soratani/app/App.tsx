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
import { Notification } from './components';

const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation()
Sentry.init({
  enabled: true,
  dsn: 'https://e7e1134d699047119148c47074e715dc@o937351.ingest.sentry.io/6378982',
  enableInExpoDevelopment: false,
  enableNativeNagger: true,
  sendClientReports: true,
  maxCacheItems: 40,
  tracesSampleRate: 1.0,
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 10000,
  attachStacktrace: true,
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      enableAppStartTracking: true,
      enableNativeFramesTracking: true,
      enableStallTracking: true,
      routingInstrumentation,
      tracingOrigins: ['localhost', 'http://192.168.2.3:3333', /^\//, /^http:\/\//],
    })
  ]
})

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

function App() {
  const [rootStore, setRootStore] = useState<Partial<RootStore> | undefined>(undefined);
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);
  const [loaded] = Font.useFonts(fontsAssets)
  useEffect(() => {
    (async () => {
      // await Font.loadAsync(fontsAssets);
      await setupRootStore().then(setRootStore);
    })();
  }, []);
  if (!loaded || !rootStore || !isNavigationStateRestored) return null;
  return (
    <RootStoreProvider value={rootStore as RootStore}>
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
