import { Box, Text, useStdout, useInput } from 'ink';

export default function App() {
	const { stdout } = useStdout();

	useInput((input, key) => {
		if ((key.ctrl && input === 'q') || key.escape) {
			process.exit();
		}
	});

	return (
		<Box height={stdout.rows} width={stdout.columns} borderStyle="round">
			<Text>Hello world!</Text>
		</Box>
	);
}
