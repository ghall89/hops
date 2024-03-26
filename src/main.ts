import chalk from 'chalk';
import { installPackage, addTap } from './workflows';

main();

async function main() {
	// is homebrew installed?
	const homebrewInstalled = brewCheck();

	if (!homebrewInstalled) {
		console.log(
			chalk.red(
				'Homebrew not installed. Visit https://brew.sh for setup instructions.'
			)
		);
		process.exit();
	}

	const arg = Bun.argv[Bun.argv.length - 1];

	// handle arguments
	switch (arg) {
		case '--tap':
		case '-t':
			await addTap();
			break;
		case '--remove':
		case '-r':
			console.log('Removing packages coming soon...');
			break;
		case '--install':
		case '-i':
		default:
			await installPackage();
			break;
	}
}

// determine if homebrew is installed
function brewCheck() {
	try {
		const { stdout } = Bun.spawn(['brew', '-v']);

		return true;
	} catch {
		return false;
	}
}
