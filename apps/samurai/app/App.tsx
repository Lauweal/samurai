import React, { useEffect, useState } from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import * as storage from 'apps/samurai/app/utils/storage';
import * as Font from 'expo-font';
import {
  AppNavigator,
  useNavigationPersistence,
  navigationRef
} from 'apps/samurai/app/navigators';
import {
  RootStore,
  RootStoreProvider,
  setupRootStore,
} from 'apps/samurai/app/models';
import { fontsAssets } from '@samurai/design';
import * as Sentry from 'sentry-expo'
import { Notification } from './components';

const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation()
Sentry.init({
  dsn: 'https://e22b8cc7b0394c7b997f06d5a03e0ace@o937351.ingest.sentry.io/6367400',
  enableInExpoDevelopment: true,
  release: '0.0.0',
  debug: true,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      routingInstrumentation,
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
