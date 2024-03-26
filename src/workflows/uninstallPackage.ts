import prompts from 'prompts';
import { brewList, brewUninstall } from '../brew';

export default async function () {
	const { listType } = await prompts(
		[
			{
				type: 'select',
				name: 'listType',
				message: 'Uninstalling a...',
				choices: [
					{
						title: 'formula',
						value: '--formula',
						description: 'Tools that run in the command line.',
					},
					{
						title: 'cask',
						value: '--cask',
						description: 'GUI applications for macOS.',
					},
				],
			},
		],
		{
			onCancel: () => process.exit(),
		}
	);

	// fetch installed packages
	const choices = await brewList(listType);

	if (!choices) return;

	const { uninstallSelection } = await prompts(
		[
			{
				type: 'select',
				name: 'uninstallSelection',
				message: 'Select a package...',
				choices,
			},
		],
		{
			onCancel: () => process.exit(),
		}
	);

	await brewUninstall(listType, uninstallSelection);
}
