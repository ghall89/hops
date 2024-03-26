import { $ } from 'bun';
import ora from 'ora';
import listToOptions from '../utils/listToOptions';

import type { Choice } from 'prompts';

// search homebrew for packages that match query
export default async function (type: string, query: string): Promise<Choice[]> {
	const spinner = ora('Searching Homebrew...').start();

	const output = await $`brew desc ${type} --name ${query} --eval-all`.text();

	const results = listToOptions(output);

	if (!results) {
		spinner.fail('There was a problem...');
		process.exit();
	} else if (results.length < 1) {
		spinner.fail('No packages found.');
		process.exit();
	}

	spinner.succeed(
		`${results.length} ${results.length > 1 ? 'packages' : 'package'} found!`
	);

	return results;
}
