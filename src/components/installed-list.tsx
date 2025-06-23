import { Box, Text, useFocus } from 'ink';
import { useMemo } from 'react';
import { create } from 'zustand';

import { useHomebrew } from '@/lib/providers/homebrew-provider';

import ScrollingList from './ui/scrolling-list';

export default function InstalledList() {
  const { isFocused } = useFocus();
  const { store } = useHomebrew();

  if (store?.loading) {
    return <Text>Loading...</Text>;
  }

  const listMemo = useMemo(
    () =>
      store?.installedCasks.map(({ name, description }) => ({
        text: name,
        description,
      })),
    [store],
  );

  return (
    <Box flexDirection="row">
      <ScrollingList isActive items={listMemo ?? []} />
    </Box>
  );
}
