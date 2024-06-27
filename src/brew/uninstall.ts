import { $ } from 'bun';
import ora from 'ora';

import type { PackageType } from '../types';
import { handleError } from '../utils';

// uninstall package with homebrew
export default async function (
	type: PackageType,
	name: string,
	zap: boolean = false
) {
	const spinner = ora(`Uninstalling ${name}...`).start();

	try {
		await $`brew uninstall ${type} ${zap ? '--zap' : ''} ${name} --quiet`.text();

		spinner.succeed(`Successfully uninstalled ${name}!`);
	} catch (err) {
		handleError(err, spinner);
	}
}
