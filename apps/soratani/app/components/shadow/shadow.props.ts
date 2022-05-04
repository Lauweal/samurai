import React from 'react';
import { ViewStyle } from 'react-native';

export interface ShadowProps {
  style?: ViewStyle;
  shadowBoxStyle?: {
    shadowColor: string;
    shadowOpacity: number;
    shadowOffset: Record<'width' | 'height', number>;
    shadowRadius: number;
  };
  children?: React.ReactNode;
}
