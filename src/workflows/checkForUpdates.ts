import prompts, { Choice } from 'prompts';
import { brewGetUpdates, brewUpgrade } from '../brew';

export default async function () {
	const updates = await brewGetUpdates();

	const { selection } = await prompts([
		{
			type: 'multiselect',
			name: 'selection',
			message: 'Select a package to update',
			choices: updates.map(
				(update): Choice => ({
					title: update.name,
					value: update.name,
					description: update.new_version,
				})
			),
		},
	]);

	if (selection.length === 0) {
		console.log('No packages selected...');
		process.exit();
	}

	await brewUpgrade(selection);
}
