import React, { isValidElement } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ShadowBoxView } from '../shadow';
import { sizes, palette, fonts } from '@samurai/design';
import { InputProps } from './input.props';

const styles = StyleSheet.create({
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: sizes.spacing_12,
    margin: sizes.spacing_12,
    backgroundColor: palette.bg,
    borderWidth: 1,
    borderRadius: sizes.radius_8,
    borderColor: palette.border,
  },
  input: {
    flex: 1,
    letterSpacing: 1.5,
  },
  prefix: {
    marginRight: sizes.spacing_8,
  },
  suffix: {},
});

export function Input(props: InputProps) {
  const { type = 'text', placeholder = '请输入', suffix, prefix } = props;

  return (
    <ShadowBoxView
      style={styles.inputBox}
      shadowBoxStyle={{
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 5,
      }}
    >
      {isValidElement(prefix) && <View style={styles.prefix}>{prefix}</View>}
      <TextInput
        placeholder={placeholder}
        style={[styles.input, fonts.h3]}
        secureTextEntry={type === 'password'}
      />
      {isValidElement(suffix) && <View style={styles.suffix}>{suffix}</View>}
    </ShadowBoxView>
  );
}

export default Input;
