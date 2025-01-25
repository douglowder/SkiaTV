import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import { ReanimatedExample } from '@/components/Reanimated/index';

export default function ReanimatedScreen() {
  const styles = useReanimatedScreenStyles();
  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Skia demo "Reanimated"</ThemedText>
      </ThemedView>
      <ReanimatedExample />
    </ThemedView>
  );
}

const useReanimatedScreenStyles = function () {
  const { scale } = useScale();
  return StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
    },
  });
};
