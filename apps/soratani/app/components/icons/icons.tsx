
import { iconsAssets, palette } from '@samurai/design';
import React from 'react';

import { TouchableOpacity, StyleSheet, Image, GestureResponderEvent } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
})

export type IconType = 'eye' | 'eye_close' | 'cancel' | 'correct'

/* eslint-disable-next-line */
export interface IconsProps {
  width?: number,
  icon: IconType,
  color?: string,
  onPress?: (e: GestureResponderEvent) => void
}


export function Icons(props: IconsProps) {
  const { width = 40, color = palette.text_3, icon, onPress = () => { } } = props

  return (
    <TouchableOpacity style={[styles.container, { width }]} onPress={onPress}>
      <Image source={iconsAssets[icon]} style={{
        height: width / 2,
        width: width / 2,
        tintColor: icon == 'cancel' ? palette.danger : color
      }} />
    </TouchableOpacity>
  );
};


export default Icons;
