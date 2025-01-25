import {
  add,
  Canvas,
  Circle,
  LinearGradient,
  vec,
  sub,
  Fill,
  mix,
  BackdropFilter,
  Blur,
} from '@shopify/react-native-skia';
import React, { useMemo } from 'react';
import { useDerivedValue } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

import { useLoop } from '../Animations';
import { ThemedView } from '../ThemedView';
import { useScale } from '@/hooks/useScale';

export const Glassmorphism = () => {
  const { scale } = useScale();
  const width = 1000 * scale;
  const height = 500 * scale;
  const styles = useDemoStyles();
  const c = vec(width / 2, height * 0.6);
  const r = c.x - 32;
  const rect = useMemo(() => ({ x: 0, y: c.y, width, height }), [c.y, width]);

  const progress = useLoop({ duration: 2000 });
  const start = useDerivedValue(
    () => sub(c, vec(0, mix(progress.value, r, r / 2))),
    [progress],
  );
  const end = useDerivedValue(
    () => add(c, vec(0, mix(progress.value, r, r / 2))),
    [],
  );
  const radius = useDerivedValue(
    () => mix(progress.value, r, r / 2),
    [progress],
  );

  return (
    <ThemedView style={styles.container}>
      <Canvas style={{ width, height }} opaque>
        <Fill color="rgb(128,128,128)" />
        <Circle c={c} r={radius}>
          <LinearGradient
            start={start}
            end={end}
            colors={['#FFF723', '#E70696']}
          />
        </Circle>
        <BackdropFilter filter={<Blur blur={10} />} clip={rect}>
          <Fill color="rgba(0, 0, 0, 0.3)" />
        </BackdropFilter>
      </Canvas>
    </ThemedView>
  );
};

const useDemoStyles = () => {
  const { scale } = useScale();
  return StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 250 * scale,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
