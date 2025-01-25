import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import { Glassmorphism } from '@/components/Glassmorphism';

export default function GlassmorphismScreen() {
  const styles = useGlassmorphismScreenStyles();
  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Skia demo "Glassmorphism"</ThemedText>
      </ThemedView>
      <Glassmorphism />
    </ThemedView>
  );
}

const useGlassmorphismScreenStyles = function () {
  const { scale } = useScale();
  return StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
    },
  });
};
