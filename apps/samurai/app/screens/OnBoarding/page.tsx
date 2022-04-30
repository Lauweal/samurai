import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { palette, sizes } from '@samurai/design';
import { Screen, Button } from 'apps/samurai/app/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Process } from './components';
import { translate } from 'apps/samurai/app/i18n';
import { NavigatorParamList } from 'apps/samurai/app/navigators';
import { onBoardingScreens } from './const';

const styles = StyleSheet.create({
  firstButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: sizes.spacing_24,
    marginVertical: sizes.spacing_24,
  },
  lastButton: {
    paddingHorizontal: sizes.spacing_24,
    marginVertical: sizes.spacing_24,
  },
  skipButton: {
    backgroundColor: palette.bg,
  },
  skipLabel: {
    color: palette.text_2,
  },
  nextButton: {
    height: 40,
    width: 100,
    borderRadius: sizes.radius_8,
  },
  startButton: {
    height: 60,
    borderRadius: sizes.radius_8,
  },
});

export const OnBoarding: FC<
  NativeStackScreenProps<NavigatorParamList, 'OnBoarding'>
> = observer(function OnBoarding({ navigation }) {
  return (
    <Screen unsafe>
      <Process data={onBoardingScreens}>
        {(next, ok) => {
          return !ok ? (
            <View style={styles.firstButton}>
              <Button
                label={translate('OnBoarding.button.skip') as string}
                buttonContainerStyle={styles.skipButton}
                labelStyle={styles.skipLabel}
                onPress={() => navigation.replace('SignUp')}
              />
              <Button
                label={translate('OnBoarding.button.next') as string}
                buttonContainerStyle={styles.nextButton}
                onPress={next}
              />
            </View>
          ) : (
            <View style={styles.lastButton}>
              <Button
                label={translate('OnBoarding.button.start') as string}
                buttonContainerStyle={styles.startButton}
                onPress={() => navigation.replace('SignUp')}
              />
            </View>
          );
        }}
      </Process>
    </Screen>
  );
});
