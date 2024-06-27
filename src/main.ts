import { parseArgs } from 'util';
import chalk from 'chalk';
import {
	installPackage,
	uninstallPackage,
	addTap,
	checkForUpdates,
} from './workflows';

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

	const { values } = parseArgs({
		args: Bun.argv,
		options: {
			tap: {
				type: 'boolean',
			},
			remove: {
				type: 'boolean',
			},
			update: {
				type: 'boolean',
			},
			add: {
				type: 'boolean',
			},
			zap: {
				type: 'boolean',
			},
		},
		allowPositionals: true,
		strict: true,
	});

	// handle arguments
	if (values?.tap) {
		await addTap();
	} else if (values?.add) {
		await installPackage();
	} else if (values?.remove) {
		await uninstallPackage(values?.zap);
	} else if (values?.update) {
		checkForUpdates();
	} else {
		await installPackage();
	}
}

// determine if homebrew is installed
function brewCheck() {
	try {
		Bun.spawn(['brew', '-v']);

		return true;
	} catch {
		return false;
	}
}
