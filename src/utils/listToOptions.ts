import type { Choice } from 'prompts';

// take output from 'brew' commands and convert to an array of prompt Choices
export default function (input: string): Choice[] {
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
				title: splitString[0],
				value: splitString[0],
				description: splitString[1],
			};
		});

	return output;
}
