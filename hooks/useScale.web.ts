export type ScaleResult = {
  width: number;
  height: number;
  scale: number;
};

export function useScale(): ScaleResult {
  const width = global.window.innerWidth;
  const height = global.window.innerHeight;
  const scale = 1.0;
  return {
    width,
    height,
    scale,
  };
}
