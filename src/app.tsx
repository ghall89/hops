import { Box, useInput, useStdout } from 'ink';

import InstalledList from './components/installed-list';

export default function App() {
  const { stdout } = useStdout();

  useInput((input, key) => {
    if ((key.ctrl && input === 'q') || key.escape) {
      process.exit();
    }
  });

  return (
    <Box height={stdout.rows - 1} width={stdout.columns}>
      <InstalledList />
    </Box>
  );
}
