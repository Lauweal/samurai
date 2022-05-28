import React from 'react';
// import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnBoarding, WebBox, SignUp, SignIn, EnvSetting } from 'apps/soratani/app/screens';
import { navigationRef } from './navigation-utilities';
import { useStores } from '../models';
import { useColorScheme, Appearance } from 'react-native';

export type NavigatorParamList = {
  OnBoarding: undefined;
  SignUp: undefined;
  SignIn: undefined;
  env: undefined;
  Protocol: { uri?: string, token?: string };
  WebBox: { uri?: string, token?: string }
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = Appearance.getColorScheme();
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
        <Stack.Group>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name='WebBox' component={WebBox} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Protocol" component={WebBox} />
          <Stack.Screen name="env" component={EnvSetting} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppNavigator.displayName = 'AppNavigator';

const exitRoutes = ['login'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
