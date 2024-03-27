import { $ } from 'bun';
import ora from 'ora';
import { listToOptions, checkResults } from '../utils';

import type { Choice } from 'prompts';
import type { PackageType } from '../types';

// get a list of installed formulae or casks
export default async function (type: PackageType): Promise<Choice[]> {
	let output: string = '';

	const spinner = ora(`Getting installed packages...`).start();

	switch (type) {
		case '--formula':
			output = await $`brew leaves | xargs brew desc --eval-all`.text();
			break;
		case '--cask':
			output = await $`brew ls --casks | xargs brew desc --eval-all`.text();
			break;
	}

	const results = listToOptions(output);

	checkResults(spinner, results);

	spinner.succeed('Packages found!');

	return results;
}
