import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import {
  BlurMask,
  vec,
  Canvas,
  Circle,
  Fill,
  Group,
  polar2Canvas,
  mix,
} from '@shopify/react-native-skia';
import type { SharedValue } from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';

import { useLoop } from './Animations';

interface RingProps {
  index: number;
  progress: SharedValue<number>;
  total: number;
}

const Ring = ({ index, progress, total }: RingProps) => {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const c1 = colorScheme === 'dark' ? '#61bea2' : '#223344';
  const c2 = colorScheme === 'dark' ? '#529ca0' : '#334455';

  const R = width / 8;
  const center = useMemo(
    () => vec(width / 2, height / 2 - 64),
    [height, width],
  );

  const transform = useDerivedValue(() => {
    const theta = (index * (2 * Math.PI)) / total;
    const { x, y } = polar2Canvas(
      { theta, radius: progress.value * R },
      { x: 0, y: 0 },
    );
    const scale = mix(progress.value, 0.3, 0.6);
    return [{ translateX: x }, { translateY: y }, { scale }];
  });

  return (
    <Circle
      c={center}
      r={R}
      color={index % 2 ? c1 : c2}
      origin={center}
      transform={transform}
    />
  );
};

export const Breathe = () => {
  const width = 800;
  const height = 300;
  const center = useMemo(() => vec(width / 2, height / 2), [height, width]);

  const colorScheme = useColorScheme();

  const progress = useLoop({ duration: 3000 });

  const transform = useDerivedValue(() => [
    { rotate: mix(progress.value, -Math.PI / 2, 0) },
  ]);

  return (
    <View style={styles.container}>
      <Canvas style={{ width, height }} opaque>
        <Fill
          color={
            colorScheme === 'dark' ? 'rgb(20, 30, 40)' : 'rgb(247, 249, 251)'
          }
        />
        <Group origin={center} transform={transform} blendMode="hardLight">
          <BlurMask style="solid" blur={40} />
          {new Array(6).fill(0).map((_, index) => {
            return (
              <Ring key={index} index={index} progress={progress} total={6} />
            );
          })}
        </Group>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
