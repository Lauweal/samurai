import { palette } from '@samurai/design';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window')

interface DotsProps {
  scrollX: Animated.Value;
  count: number;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function Dots(props: DotsProps) {
  const { scrollX } = props;

  const dotPosition = Animated.divide(scrollX, width);
  return (
    <View style={styles.container}>
      {Array(props.count)
        .fill(0)
        .map((_, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              palette.primary_light_default,
              palette.primary,
              palette.primary_light_default,
            ],
            extrapolate: 'clamp',
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 30, 10],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: dotWidth,
                height: 10,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
    </View>
  );
}
