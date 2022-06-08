import React, { isValidElement } from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions } from 'react-native';
import { ShadowBoxView } from '../shadow';
import { sizes, palette, fonts } from '@samurai/design';
import { InputProps } from './input.props';


const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    height: height > 800 ? 55 : 45,
    paddingHorizontal: sizes.spacing_24,
    marginTop: height > 800 ? sizes.spacing_8 : 0,
    backgroundColor: palette.tertiary_light_default,
    borderRadius: sizes.radius_12,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export function Input(props: InputProps) {
  const {
    label = "",
    errorMsg = "",
    containerStyle,
    inputContainerStyle = {},
    inputStyle = {},
    type = 'text',
    placeholder = '请输入',
    maxLength,
    suffix,
    prefix,
    value,
    onChange = () => { }
  } = props;
  return (
    <View style={{ ...containerStyle }}>
      <View style={styles.label}>
        <Text style={{ color: palette.text_2, ...fonts.body4 }}>{label}</Text>
        <Text style={{ color: palette.danger, ...fonts.body4 }}>{errorMsg}</Text>
      </View>
      <View style={[styles.inputBox, inputContainerStyle]}>
        {isValidElement(prefix) && prefix}
        <TextInput
          style={{ flex: 1, letterSpacing: 1.4, fontWeight: "500", ...inputStyle }}
          defaultValue={value}
          placeholder={placeholder}
          placeholderTextColor={palette.text_2}
          secureTextEntry={type === 'password'}
          keyboardType={type === 'password' ? 'default' : type as any}
          textContentType={type === 'password' ? 'oneTimeCode' : 'emailAddress'}
          autoCapitalize="none"
          returnKeyType="done"
          autoCorrect={false}
          importantForAutofill="no"
          maxLength={maxLength}
          onEndEditing={(e) => onChange(e.nativeEvent.text)}
        />
        {isValidElement(suffix) && suffix}
      </View>
    </View>
  );
}

export default Input;
