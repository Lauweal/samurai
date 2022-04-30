
import { fonts, palette, sizes } from '@samurai/design';
import React, { useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, GestureResponderEvent } from 'react-native';

const styles = StyleSheet.create({
  switchOnContainer: {
    width: 40,
    height: 20,
    paddingRight: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 10,
    backgroundColor: palette.primary,
  },
  switchOffContainer: {
    width: 40,
    height: 20,
    paddingLeft: 2,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.secondary,
    borderRadius: 10
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6
  }
})

/* eslint-disable-next-line */
export interface SwitchProps {
  label?: string
  value?: boolean
  onChange?: (...args: any) => void
}


export function Switch(props: SwitchProps) {
  const {
    label = "",
    onChange = () => { },
    value
  } = props

  const onPress = useCallback((e: any) => {
    onChange(Object.assign(e, { target: { ...e.target, type: 'checkbox', checked: !value } }))
  }, [value])

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ flexDirection: "row" }} >
        <View style={!!value ? styles.switchOnContainer : styles.switchOffContainer}>
          <View
            style={{
              ...styles.dot,
              backgroundColor: value ? palette.bg : palette.secondary,
            }}
          />
        </View>
        {label !== "" &&
          <Text
            style={{
              color: value ? palette.primary : palette.secondary,
              marginLeft: sizes.spacing_8,
              ...fonts.body4
            }}
          >
            {label}
          </Text>
        }
      </View>
    </TouchableWithoutFeedback>
  );
};


export default Switch;
