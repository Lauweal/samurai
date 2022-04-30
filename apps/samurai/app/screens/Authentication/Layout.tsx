import { palette, sizes, fonts } from '@samurai/design';
import { Dimensions } from 'react-native';
import { Screen } from 'apps/samurai/app/components'
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
  logoContainer: { alignItems: 'center', marginTop: sizes.spacing_16 },
  logoImage: { height: 100, width: 200 },
  titleContainer: { marginTop: height > 800 ? sizes.spacing_12 : 0, marginBottom: sizes.spacing_8 },
  title: { textAlign: 'center' },
  subtitle: {
    textAlign: 'center',
    color: palette.text_2,
    marginTop: sizes.base,
  },
  content: {
    marginTop: sizes.spacing_20,
    paddingLeft: sizes.spacing_32,
    paddingRight: sizes.spacing_32,
  }
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
      <View style={styles.content}>
        {props.children}
      </View>
    </Screen>
  );
}
