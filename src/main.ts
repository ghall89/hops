import chalk from 'chalk';
import { installPackage } from './workflows';

// determine if homebrew is installed
const brewCheck = () => {
	try {
		const { stdout } = Bun.spawn(['brew', '-v']);

		return true;
	} catch {
		return false;
	}
};

const main = async () => {
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

	await installPackage();
};

main();
