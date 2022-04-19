import React from 'react';

import {
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  GestureResponderEvent,
  TextStyle,
} from 'react-native';
import { palette, fonts } from '@samurai/design';

const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.primary,
  },
  label: {
    color: palette.bg,
    ...fonts.h3,
  },
  label2: {
    flex: 1,
    textAlign: 'right',
    color: palette.bg,
  },
});

/* eslint-disable-next-line */
export interface TextButtonProps {
  buttonContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  label2Style?: TextStyle;
  label: string;
  label2?: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export function Button(props: TextButtonProps) {
  const {
    buttonContainerStyle,
    disabled,
    label,
    labelStyle,
    label2 = '',
    label2Style,
    onPress,
  } = props;

  return (
    <TouchableOpacity
      style={[styles.touchableOpacity, buttonContainerStyle]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      {label2 != '' && (
        <Text style={[styles.label2, fonts.h3, label2Style]}>{label2}</Text>
      )}
    </TouchableOpacity>
  );
}
