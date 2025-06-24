import { Box, Text, useFocus } from 'ink';
import Spinner from 'ink-spinner';
import { useMemo } from 'react';

import { useHomebrew } from '@/lib/providers/homebrew-provider';

import ScrollingList from './ui/scrolling-list';

export default function InstalledList() {
  const { installedCasks, loading } = useHomebrew();

  if (loading) {
    return (
      <Box flexDirection="row">
        <Spinner />
        <Text>Loading...</Text>
      </Box>
    );
  }

  const listMemo = useMemo(
    () =>
      installedCasks.map(({ name, description }) => ({
        text: name,
        description,
      })),
    [installedCasks],
  );

  return (
    <Box flexDirection="row">
      <ScrollingList isActive items={listMemo ?? []} />
    </Box>
  );
}
