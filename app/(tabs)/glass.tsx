import { SkiaDemoScreen } from '@/components/SkiaDemoScreen';

import { Glassmorphism } from '@/components/SkiaDemos/Glassmorphism/index';

export default function GlassmorphismScreen() {
  return (
    <SkiaDemoScreen title={`Skia demo "Glassmorphism"`}>
      <Glassmorphism />
    </SkiaDemoScreen>
  );
}
