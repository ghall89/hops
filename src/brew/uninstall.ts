import { $ } from 'bun';
import ora from 'ora';

import type { PackageType } from '../types';

// uninstall package with homebrew
export default async function (type: PackageType, name: string) {
	const spinner = ora(`Uninstalling ${name}...`).start();

	try {
		await $`brew uninstall ${type} ${name} --quiet`;

		spinner.succeed(`Successfully uninstalled ${name}!`);
	} catch {
		spinner.fail('There was a problem...');
		process.exit();
	}
}
