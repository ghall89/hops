import { $ } from 'bun';
import ora from 'ora';

import type { PackageType } from '../types';

// install package with homebrew
export default async function (type: PackageType, name: string) {
	const spinner = ora(`Installing ${name}...`).start();

	try {
		await $`brew install ${type} ${name} --quiet`;

		spinner.succeed(`Successfully installed ${name}!`);
	} catch {
		spinner.fail('There was a problem...');
		process.exit();
	}
}
