import { Image, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';

export default function HomeScreen() {
  const styles = useHomeScreenStyles();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">TV demos using react-native-skia</ThemedText>
        <HelloWave />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const useHomeScreenStyles = function () {
  const { scale } = useScale();
  return StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8 * scale,
    },
    stepContainer: {
      gap: 8 * scale,
      marginBottom: 8 * scale,
    },
    reactLogo: {
      height: 178 * scale,
      width: 290 * scale,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });
};
