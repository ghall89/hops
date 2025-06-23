import { Box, Text, useStdout, useInput } from 'ink';

import HomebrewProvider from './lib/providers/homebrew-provider';
import InstalledList from './components/installed-list';

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
