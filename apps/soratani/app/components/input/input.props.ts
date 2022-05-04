import React from 'react';
import { KeyboardTypeOptions, ViewStyle } from 'react-native';

export enum InputType {
  password = '密码'
}

export interface InputProps {
  label?: string;
  errorMsg?: string;
  maxLength?: number;
  type?: (keyof typeof InputType) | KeyboardTypeOptions;
  prefix?: React.ReactElement;
  suffix?: React.ReactElement;
  placeholder?: string;
  value?: string;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  onChange?: (...args: any) => void
}
