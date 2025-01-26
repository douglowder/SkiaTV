import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useScale } from '@/hooks/useScale';
import { Breathe } from '@/components/SkiaDemos/Breathe';

export const SkiaDemoScreen = ({
  title,
  children,
}: {
  title: string;
  children: any;
}) => {
  const styles = useDemoStyles();
  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
      </ThemedView>
      {children}
    </ThemedView>
  );
};

const useDemoStyles = function () {
  const { scale } = useScale();
  return StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      gap: 8 * scale,
      margin: 20 * scale,
    },
  });
};
