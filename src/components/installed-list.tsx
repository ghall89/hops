import { Box } from 'ink';
import Spinner from 'ink-spinner';
import { useMemo } from 'react';

import { useHomebrewStore } from '@/lib/stores/homebrew';

import PackageListItem, {
  type PackageListItemProps,
} from './ui/package-list-item';
import ScrollingList from './ui/scrolling-list';

export default function InstalledList() {
  const { installedCasks, loading } = useHomebrewStore();

  const listMemo = useMemo<PackageListItemProps[]>(
    () =>
      installedCasks.map(({ name, description }) => ({
        name,
        description,
      })),
    [installedCasks],
  );

  return loading ? (
    <Spinner />
  ) : (
    <Box flexDirection="row">
      <ScrollingList
        isActive
        renderItem={PackageListItem}
        items={listMemo ?? []}
      />
    </Box>
  );
}
