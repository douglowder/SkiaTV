import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';

import { Filters } from '@/components/Filters';

export default function FiltersScreen() {
  const styles = useFiltersScreenStyles();
  const scale = useScale();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={310 * scale}
          name="code-slash"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Skia demo "Filters"</ThemedText>
      </ThemedView>

      <Filters />
    </ParallaxScrollView>
  );
}

const useFiltersScreenStyles = function () {
  const scale = useScale();
  return StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -90 * scale,
      left: -35 * scale,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
    },
  });
};