import { Dimensions, Platform, useWindowDimensions } from 'react-native';

export type ScaleResult = {
  width: number;
  height: number;
  scale: number;
};
export function useScale(): ScaleResult {
  const { width, height } = Dimensions.get('screen');
  const scale = Platform.isTV ? width / 1000 : 1;
  return {
    width,
    height,
    scale,
  };
}
