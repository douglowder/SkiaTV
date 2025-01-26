import { SkiaDemoScreen } from '@/components/SkiaDemoScreen';

import { Breathe } from '@/components/SkiaDemos/Breathe';

export default function BreatheScreen() {
  return (
    <SkiaDemoScreen title={`Skia demo "Breathe"`}>
      <Breathe />
    </SkiaDemoScreen>
  );
}
