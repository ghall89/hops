import { $ } from 'bun';
import ora from 'ora';

// install package with homebrew
export default async function (type: string, name: string) {
	const spinner = ora(`Installing ${name}...`).start();

	try {
		await $`brew install ${type} ${name} --quiet`;

		spinner.succeed(`Successfully installed ${name}!`);
	} catch {
		spinner.fail('There was a problem...');
		process.exit();
	}
}
