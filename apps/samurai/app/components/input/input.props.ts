import React from 'react';

export enum InputType {
  password = '密码',
  text = '文本',
  number = '数字',
}

export interface InputProps {
  type?: keyof typeof InputType;
  prefix?: React.ReactElement;
  suffix?: React.ReactElement;
  placeholder?: string;
  value?: string;
  onChange?: (...args: any) => void
}
