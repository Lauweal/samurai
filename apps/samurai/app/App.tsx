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
} from 'apps/samurai/app/navigators';
import {
  RootStore,
  RootStoreProvider,
  setupRootStore,
} from 'apps/samurai/app/models';
import { fontsAssets } from '@samurai/design';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default function App() {
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
        <AppNavigator
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      </SafeAreaProvider>
    </RootStoreProvider>
  );
}
