import { SkiaDemoScreen } from '@/components/SkiaDemoScreen';

import { BarChart } from '@/components/VictoryDemos/BarChart/BarChart';

export default function BarChartScreen() {
  return (
    <SkiaDemoScreen title={`Victory Bar Chart`}>
      <BarChart />
    </SkiaDemoScreen>
  );
}
