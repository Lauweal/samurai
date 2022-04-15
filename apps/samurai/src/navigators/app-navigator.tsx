import React from 'react';
import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnBoarding, WebBox } from '../app/screens';
import { Sigin } from '../app/screens/Authentication';
import { navigationRef } from './navigation-utilities';
import { useStores } from '../models';

export type NavigatorParamList = {
  OnBoarding: undefined;
  Sigin: undefined;
  WebBox: { uri: string }
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={'OnBoarding'}
      >
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Sigin" component={Sigin} />
        <Stack.Screen name='WebBox' component={WebBox} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';

const exitRoutes = ['login'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
