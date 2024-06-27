import { $ } from 'bun';
import ora from 'ora';

import { handleError } from '../utils';

export default async function (): Promise<Update[]> {
	const spinner = ora('Checking for updates...').start();

	const updatesArr: Update[] = [];

	try {
		const updates = await $`brew outdated --json=v2`.text();

		const updatesObj: Response = JSON.parse(updates);

		updatesObj.formulae.forEach((formula) =>
			updatesArr.push({
				name: formula.name,
				installed_versions: formula.installed_versions,
				new_version: formula.current_version,
				type: 'Formula',
			})
		);

		updatesObj.casks.forEach((cask) =>
			updatesArr.push({
				name: cask.name,
				installed_versions: cask.installed_versions,
				new_version: cask.current_version,
				type: 'Cask',
			})
		);

		spinner.succeed(`Found ${updatesArr.length} updates...`);
	} catch (err) {
		handleError(err, spinner);
	}

	return updatesArr;
}

interface Update {
	name: string;
	installed_versions: string[];
	new_version: string;
	type: 'Cask' | 'Formula';
}

interface Formula {
	name: string;
	installed_versions: string[];
	current_version: string;
	pinned: boolean;
	pinned_version: string | null;
}

interface Cask {
	name: string;
	installed_versions: string[];
	current_version: string;
}

interface Response {
	formulae: Formula[];
	casks: Cask[];
}
