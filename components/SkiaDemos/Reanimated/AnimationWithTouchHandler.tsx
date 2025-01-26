import React from 'react';
import { StyleSheet } from 'react-native';
import { Canvas, Circle, Fill } from '@shopify/react-native-skia';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withDecay, withTiming } from 'react-native-reanimated';

import { AnimationDemo, Size, Padding } from './Components';
import { useScale } from '@/hooks/useScale';

export const AnimationWithTouchHandler = () => {
  const { width: windowWidth, scale } = useScale();
  const width = windowWidth * 0.9;

  const translateX = useSharedValue((width - Size - Padding) / 2);

  const gesture = Gesture.Pan()
    .onChange((e) => {
      translateX.value += e.changeX;
    })
    .onEnd((e) => {
      const leftBoundary = Size;
      const rightBoundary = width - Size - Padding;
      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [leftBoundary, rightBoundary],
      });
    });

  const pressGesture = () => {
    const oldValue = translateX.value;
    const leftBoundary = oldValue;
    const rightBoundary = oldValue;
    translateX.value = withTiming(oldValue + 500 * scale, {
      duration: 1000,
    });
    setTimeout(
      () =>
        (translateX.value = withDecay({
          velocity: -500,
          clamp: [leftBoundary, rightBoundary],
          rubberBandEffect: true,
          rubberBandFactor: 2,
        })),
      2000,
    );
  };
  return (
    <AnimationDemo
      title="Decay animation with touch handler"
      button={{
        title: 'Pull right and then let go',
        action: pressGesture,
      }}
    >
      <GestureDetector gesture={gesture}>
        <Canvas style={styles.canvas}>
          <Fill color="white" />
          <Circle cx={translateX} cy={40} r={20} color="#3E3E" />
          <Circle cx={translateX} cy={40} r={15} color="#AEAE" />
        </Canvas>
      </GestureDetector>
    </AnimationDemo>
  );
};

const styles = StyleSheet.create({
  canvas: {
    height: 80,
    width: '100%' as const,
    backgroundColor: '#FEFEFE' as const,
  },
});
