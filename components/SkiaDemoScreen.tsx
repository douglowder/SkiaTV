import { Platform, StyleSheet, TVFocusGuideView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export const SkiaDemoScreen = ({
  title,
  children,
}: {
  title: string;
  children: any;
}) => {
  const styles = useDemoStyles();
  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
      </ThemedView>
      {children}
    </TVFocusGuideView>
  );
};

const useDemoStyles = function () {
  const { scale } = useScale();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: colors.background,
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
      margin: 20 * scale,
      marginTop:
        Platform.OS === 'ios' && (Platform.isTV || Platform.isPad)
          ? 100 * scale
          : 20 * scale,
    },
  });
};
