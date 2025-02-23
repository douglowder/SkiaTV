import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Circle, Fill } from '@shopify/react-native-skia';
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { AnimationDemo, Size, Padding } from './Components';
import { useScale } from '@/hooks/useScale';

function mix(value: number, x: number, y: number) {
  'worklet';
  return x * (1 - value) + y * value;
}

export const InterpolationWithEasing = () => {
  const { width: windowWidth, scale } = useScale();
  const width = windowWidth * 0.9;
  const progress = useSharedValue(0);
  const position = useDerivedValue(() => {
    return mix(progress.value, 10, width * 0.8 - (Size + Padding));
  });
  const radius = useDerivedValue(() => {
    return 5 + progress.value * 25 * scale;
  });
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.cubic) }),
      -1,
      true,
    );
  }, [progress]);
  return (
    <AnimationDemo title={'Interpolating value using an easing'}>
      <Canvas
        style={{
          height: 60 * scale,
          width: '80%' as const,
          backgroundColor: '#FEFEFE' as const,
        }}
      >
        <Fill color="white" />
        <Circle cx={position} cy={20} r={radius} color="#DC4C4C" />
      </Canvas>
    </AnimationDemo>
  );
};
