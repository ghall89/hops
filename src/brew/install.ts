import { $ } from 'bun';
import ora from 'ora';

import type { PackageType } from '../types';
import { handleError } from '../utils';

// install package with homebrew
export default async function (type: PackageType, name: string) {
	const spinner = ora(`Installing ${name}...`).start();

	try {
		await $`brew install ${type} ${name} --quiet`.text();

		spinner.succeed(`Successfully installed ${name}!`);
	} catch (err) {
		handleError(err, spinner);
	}
}
