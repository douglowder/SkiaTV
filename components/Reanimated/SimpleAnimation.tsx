import React, { useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Canvas, Fill, Rect } from '@shopify/react-native-skia';

import { AnimationDemo, Size } from './Components';
import { useScale } from '@/hooks/useScale';

export const SimpleAnimation = () => {
  const { width: fullWindowWidth } = useScale();
  const windowWidth = fullWindowWidth * 0.9;
  const width = useSharedValue(20);
  const rect = useDerivedValue(() => {
    return { x: 0, y: 10, width: width.value, height: Size };
  });
  useEffect(() => {
    width.value = withRepeat(withTiming(windowWidth, { duration: 1000 }), -1);
  }, [width, windowWidth]);
  return (
    <AnimationDemo title={'Basic animation using derived values'}>
      <Canvas style={styles.canvas}>
        <Fill color="white" />
        <Rect rect={rect} color="#8556E5" />
      </Canvas>
    </AnimationDemo>
  );
};

const styles = StyleSheet.create({
  canvas: {
    height: 40,
    width: '100%' as const,
    backgroundColor: '#FEFEFE' as const,
  },
});
