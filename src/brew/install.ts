import ora from 'ora';

// install package with homebrew
export default async (type: string, name: string) => {
	const spinner = ora(`Installing ${name}...`).start();

	try {
		const { stdout } = Bun.spawn(['brew', 'install', type, name, '--quiet']);

		const output = await new Response(stdout).text();

		spinner.succeed(`Successfully installed ${name}!`);
	} catch {
		spinner.fail('There was a problem...');
		process.exit();
	}
};
