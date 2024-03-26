import { $ } from 'bun';
import ora from 'ora';

// search homebrew for packages that match query
export default async function (type: string, query: string) {
	const spinner = ora('Searching Homebrew...').start();

	const output = await $`brew desc ${type} --name ${query} --eval-all`.text();

	const results = output
		.split('\n')
		.filter((row: string) => {
			if (row.length === 0) return false;
			if (row.includes('==>')) return false;
			return true;
		})
		.map((result: string) => {
			const splitString = result.split(': ');

			return {
				title: splitString[0],
				value: splitString[0],
				description: splitString[1],
			};
		});

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
