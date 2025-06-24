import { Box, Text, useInput, useStdout } from 'ink';

import InstalledList from './components/installed-list';
import HomebrewProvider from './lib/providers/homebrew-provider';

export default function App() {
  const { stdout } = useStdout();

  useInput((input, key) => {
    if ((key.ctrl && input === 'q') || key.escape) {
      process.exit();
    }
  });

  return (
    <HomebrewProvider>
      <Box height={stdout.rows - 1} width={stdout.columns}>
        <InstalledList />
      </Box>
    </HomebrewProvider>
  );
}
