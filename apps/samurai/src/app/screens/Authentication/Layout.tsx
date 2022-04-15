import { palette, sizes, fonts } from '@samurai/design';
import { Dimensions } from 'react-native';
import { Screen } from 'apps/samurai/src/components'
import React from 'react';
import { View, StyleSheet, Image, ViewStyle, Text } from 'react-native';
import { imagesAssets } from '@samurai/design';

const { height } = Dimensions.get('window');

interface Props {
  title: string;
  subtitle: string;
  titleContainerStyle?: ViewStyle;
  children?: React.ReactNode;
}

const styles = StyleSheet.create({
  logoContainer: { alignItems: 'center' },
  logoImage: { height: 100, width: 200 },
  titleContainer: { marginTop: height > 800 ? sizes.spacing_24 : 0 },
  title: { textAlign: 'center' },
  subtitle: {
    textAlign: 'center',
    color: palette.text_2,
    marginTop: sizes.base,
  },
});

export function AuthLayout(props: Props) {
  return (
    <Screen preset="scroll">
      <View style={styles.logoContainer}>
        <Image
          source={imagesAssets.logo}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </View>
      <View style={[styles.titleContainer, props.titleContainerStyle]}>
        <Text style={[styles.title, fonts.h2]}>{props.title}</Text>
        <Text style={[styles.subtitle, fonts.body3]}>{props.subtitle}</Text>
      </View>
      {props.children}
    </Screen>
  );
}
