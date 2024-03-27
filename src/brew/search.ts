import { $ } from 'bun';
import ora from 'ora';
import { listToOptions, checkResults } from '../utils';

import type { Choice } from 'prompts';

// search homebrew for packages that match query
export default async function (type: string, query: string): Promise<Choice[]> {
	const spinner = ora('Searching Homebrew...').start();

	const output = await $`brew desc ${type} --name ${query} --eval-all`.text();

	const results = listToOptions(output);

	checkResults(spinner, results);

	spinner.succeed(
		`${results.length} ${results.length > 1 ? 'packages' : 'package'} found!`
	);

	return results;
}
