import prompts from 'prompts';
import { brewTap } from '../brew';

export default async function () {
	const { tapName } = await prompts([
		{
			type: 'text',
			name: 'tapName',
			message: 'Tap name:',
			validate: (value: string) => validateTap(value),
		},
	]);

	brewTap(tapName);
}

function validateTap(value: string): boolean | string {
	const regex = /^.+\/.+$/;

	if (value.length < 1) return 'Tap name cannot be blank!';

	if (!regex.test(value))
		return 'Please provide a valid tap, written as "username/tap".';

	return true;
}
