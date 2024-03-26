import prompts from 'prompts';
import { brewSearch, brewInstall } from '../brew';

export default async function () {
	// request search params
	const { searchType, searchQuery } = await prompts(
		[
			{
				type: 'select',
				name: 'searchType',
				message: 'Searhing for a...',
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
			{
				type: 'text',
				name: 'searchQuery',
				message: 'Package name:',
				validate: (value: string) =>
					value.length < 1 ? 'Package name cannot be blank!' : true,
			},
		],
		{
			onCancel: () => process.exit(),
		}
	);

	// search homebrew and create an array of options
	const choices = await brewSearch(searchType, searchQuery);

	if (!choices) return;

	// prompt user to select from results
	const { installSelection } = await prompts(
		[
			{
				type: 'select',
				name: 'installSelection',
				message: 'Select a package...',
				choices,
			},
		],
		{
			onCancel: () => process.exit(),
		}
	);

	brewInstall(searchType, installSelection);
}
