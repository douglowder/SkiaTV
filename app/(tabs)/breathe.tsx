import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import { Breathe } from '@/components/Breathe';

export default function BreatheScreen() {
  const styles = useBreatheScreenStyles();
  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Skia demo "Breathe"</ThemedText>
      </ThemedView>
      <Breathe />
    </ThemedView>
  );
}

const useBreatheScreenStyles = function () {
  const { scale } = useScale();
  return StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
    },
  });
};
