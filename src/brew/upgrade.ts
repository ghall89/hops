import { $ } from 'bun';
import ora from 'ora';

import { handleError } from '../utils';

export default async function (packages: string[]) {
	const spinner = ora(`Updating ${packages.length} package(s)...`).start();

	try {
		await $`brew upgrade ${packages.join(' ')}`.text();
	} catch (err) {
		handleError(err, spinner);
	} finally {
		spinner.succeed(`${packages.length} package(s) updated!`);
	}
}
