import { SkiaDemoScreen } from '@/components/SkiaDemoScreen';

import { LineChart } from '@/components/VictoryDemos/LineChart/LineChart';

export default function BarChartScreen() {
  return (
    <SkiaDemoScreen title={`Victory Line Chart`}>
      <LineChart />
    </SkiaDemoScreen>
  );
}
