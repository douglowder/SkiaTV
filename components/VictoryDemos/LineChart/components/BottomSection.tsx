import { Box, Card, HStack, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { useScale } from '@/hooks/useScale';
import { ThemedText } from '@/components/ThemedText';

export const BottomSection = () => {
  const { scale } = useScale();
  return (
    <>
      <Box
        marginTop={5 * scale}
        paddingTop={10 * scale}
        width="95%"
        height="30%"
        justifyContent="center"
      >
        <Card>
          <HStack justifyContent="space-between">
            <VStack>
              <ThemedText type="subtitle">Apple Computers</ThemedText>
              <ThemedText type="subtitle">NASDAQ</ThemedText>
              <ThemedText type="default">Past Year</ThemedText>
            </VStack>
          </HStack>
        </Card>
      </Box>
    </>
  );
};
