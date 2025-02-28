import { Box } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { COLORMODES } from '@gluestack-style/react/lib/typescript/types';
import {
  Circle,
  LinearGradient,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import { TVFocusGuideView, useColorScheme } from 'react-native';
import { useDerivedValue, type SharedValue } from 'react-native-reanimated';
import { Area, CartesianChart, Line, useChartPressState } from 'victory-native';

import { Text as SKText } from '@shopify/react-native-skia';
import { BottomSection } from './components/BottomSection';
import { DATA, DATA2 } from './utils/data';
import { useScale } from '@/hooks/useScale';

const inter = require('@/assets/fonts/roboto.ttf');
const interBold = require('@/assets/fonts/roboto-bold.ttf');

export const LineChart = () => {
  const { scale } = useScale();
  const font = useFont(inter, 12 * scale);
  const chartFont = useFont(interBold, 30 * scale);
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
  const colorMode = useColorScheme() as COLORMODES;
  const [chartData, setChartData] = useState(DATA);

  const value = useDerivedValue(() => {
    return '$' + state.y.highTmp.value.value.toFixed(2);
  }, [state]);

  const labelColor = colorMode === 'dark' ? 'white' : 'black';
  const lineColor = colorMode === 'dark' ? 'lightgrey' : 'black';

  return (
    <TVFocusGuideView autoFocus>
      <Pressable
        onPress={() => {
          if (chartData === DATA) {
            setChartData(DATA2);
          } else {
            setChartData(DATA);
          }
        }}
        style={({ pressed, focused }) => ({
          opacity: pressed || focused ? 0.6 : 1.0,
        })}
      >
        <ThemedText type="defaultSemiBold">Update Chart</ThemedText>
      </Pressable>

      <Box
        width="100%"
        $dark-bg="$black"
        $light-bg="$white"
        alignItems="center"
        paddingHorizontal={5 * scale}
        paddingVertical={30 * scale}
      >
        <Box paddingTop={10 * scale} width="95%" height="60%">
          <CartesianChart
            data={chartData}
            xKey="day"
            yKeys={['highTmp']}
            domainPadding={{ top: 30 * scale }}
            axisOptions={{
              font,
              labelColor,
              lineColor,
            }}
            chartPressState={state}
          >
            {({ points, chartBounds }) => (
              <>
                <SKText
                  x={chartBounds.left + 10 * scale}
                  y={40 * scale}
                  font={chartFont}
                  text={value}
                  color={labelColor}
                  style={'fill'}
                />
                <Line
                  points={points.highTmp}
                  color="lightgreen"
                  strokeWidth={3 * scale}
                  animate={{ type: 'timing', duration: 500 }}
                />
                <Area
                  points={points.highTmp}
                  y0={chartBounds.bottom}
                  animate={{ type: 'timing', duration: 500 }}
                >
                  <LinearGradient
                    start={vec(chartBounds.bottom, 200 * scale)}
                    end={vec(chartBounds.bottom, chartBounds.bottom)}
                    colors={['green', '#90ee9050']}
                  />
                </Area>

                {isActive ? (
                  <ToolTip
                    x={state.x.position}
                    y={state.y.highTmp.position}
                    scale={scale}
                  />
                ) : null}
              </>
            )}
          </CartesianChart>
        </Box>
        <BottomSection />
      </Box>
    </TVFocusGuideView>
  );
};

function ToolTip({
  x,
  y,
  scale,
}: {
  x: SharedValue<number>;
  y: SharedValue<number>;
  scale: number;
}) {
  return <Circle cx={x} cy={y} r={8 * scale} color={'grey'} opacity={0.8} />;
}
