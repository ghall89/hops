import { $ } from 'bun';
import ora from 'ora';

// add a homebrew tap
export default async function (path: string) {
	const spinner = ora(`Tapping ${path}...`).start();

	try {
		await $`brew tap ${path}`;

		spinner.succeed(`${path} successfully tapped!`);
	} catch {
		spinner.fail('There was a problem...');
		process.exit();
	}
}
