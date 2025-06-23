import { $ } from 'bun';

export default class HomebrewController {
	async list(type: PackageType): Promise<Package[]> {
		let output: string = '';

		switch (type) {
			case '--formula':
				output = await $`brew leaves | xargs brew desc --eval-all`.text();
				break;
			case '--cask':
				output = await $`brew ls --casks | xargs brew desc --eval-all`.text();
				break;
		}

		const results = this.listToOptions(output);

		return results;
	}

	private listToOptions(input: string): Package[] {
		const output = input
			.split('\n')
			.filter((row: string) => {
				if (row.length === 0) return false;
				if (row.includes('==>')) return false;
				return true;
			})
			.map((result: string) => {
				const splitString = result.split(': ');

				return {
					name: splitString[0],
					description: splitString[1],
				};
			});

		return output;
	}
}

export interface Package {
	name: string;
	description: string;
}

export enum PackageType {
	formula = '--formula',
	cask = '--cask',
}
