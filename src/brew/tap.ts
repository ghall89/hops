import { $ } from 'bun';
import ora from 'ora';

import { handleError } from '../utils';

// add a homebrew tap
export default async function (path: string) {
	const spinner = ora(`Tapping ${path}...`).start();

	try {
		await $`brew tap ${path}`.text();

		spinner.succeed(`${path} successfully tapped!`);
	} catch (err) {
		handleError(err, spinner);
	}
}
