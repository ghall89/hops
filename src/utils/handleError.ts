import type { Ora } from 'ora';

export default function (err: unknown, spinner: Ora) {
	spinner.fail('There was a problem...');
	console.error(err);
	process.exit();
}
