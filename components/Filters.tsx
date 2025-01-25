import React from 'react';
import { StyleSheet } from 'react-native';
import {
  useImage,
  Canvas,
  ImageShader,
  Skia,
  Shader,
  mix,
  Fill,
} from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';

import { useLoop } from './Animations';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useScale } from '@/hooks/useScale';

const source = Skia.RuntimeEffect.Make(`
uniform shader image;
uniform float r;

half4 main(float2 xy) {   
  xy.x += sin(xy.y / r) * 4;
  return image.eval(xy).rbga;
}`)!;

export const Filters = () => {
  const width = 800;
  const height = 300;
  const progress = useLoop({ duration: 1500 });

  const uniforms = useDerivedValue(
    () => ({ r: mix(progress.value, 1, 100) }),
    [progress],
  );

  const image = useImage(require('@/assets/images/oslo.jpg'));

  return (
    <ThemedView>
      <Canvas style={{ width, height }}>
        <Fill>
          <Shader source={source} uniforms={uniforms}>
            <ImageShader
              image={image}
              fit="cover"
              x={0}
              y={0}
              tx="repeat"
              ty="repeat"
              width={width}
              height={height}
            />
          </Shader>
        </Fill>
      </Canvas>
    </ThemedView>
  );
};

const useDemoStyles = function () {
  const scale = useScale();
  const highlightColor = useThemeColor({}, 'link');
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    logContainer: {
      flexDirection: 'row',
      padding: 5 * scale,
      margin: 5 * scale,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    logText: {
      maxHeight: 300 * scale,
      width: 300 * scale,
      fontSize: 10 * scale,
      margin: 5 * scale,
      lineHeight: 12 * scale,
      alignSelf: 'flex-start',
      justifyContent: 'flex-start',
    },
    pressable: {
      borderColor: highlightColor,
      backgroundColor: textColor,
      borderWidth: 1,
      borderRadius: 5 * scale,
      margin: 5 * scale,
    },
    pressableFocused: {
      borderColor: highlightColor,
      backgroundColor: tintColor,
      borderWidth: 1,
      borderRadius: 5 * scale,
      margin: 5 * scale,
    },
    pressableText: {
      color: backgroundColor,
      fontSize: 15 * scale,
    },
  });
};
