import React, { useState } from 'react';
import { BoxShadow } from 'react-native-shadow';
import { View, Text, Platform, LayoutChangeEvent } from 'react-native';
import { ShadowProps } from './shadow.props';

export function ShadowBoxView(props: ShadowProps) {
  const { children, style, shadowBoxStyle } = props;
  const [layout, setLayout] = useState({ width: 0, height: 0, initial: false });

  function onLayout(e: LayoutChangeEvent) {
    const { width, height } = e.nativeEvent.layout;
    setLayout({ width, height, initial: true });
  }

  if (Platform.OS !== 'android') {
    return <View style={[style, { ...shadowBoxStyle }]}>{children}</View>;
  }

  if (!layout.initial) {
    return (
      <View onLayout={onLayout} style={[style, { ...shadowBoxStyle }]}>
        {children}
      </View>
    );
  }

  return (
    <BoxShadow
      setting={{
        width: layout.width,
        height: layout.height,
        color: shadowBoxStyle?.shadowColor || '#000',
        border: 10,
        radius: style?.borderRadius || 0,
        opacity: (shadowBoxStyle?.shadowOpacity as number) / 2 || 0,
        x: shadowBoxStyle?.shadowOffset?.width || 0,
        y: (shadowBoxStyle?.shadowOffset?.height as number) / 2 || 0,
        style: { marginVertical: 0 },
      }}
    >
      <View style={[style, { width: layout.width, height: layout.height }]}>
        {children}
      </View>
    </BoxShadow>
  );
}

export default ShadowBoxView;
