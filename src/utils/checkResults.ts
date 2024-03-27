import type { Ora } from 'ora';
import type { Choice } from 'prompts';

export default function (spinner: Ora, results?: Choice[]) {
	if (!results) {
		spinner.fail('There was a problem...');
		process.exit();
	} else if (results.length < 1) {
		spinner.fail('No packages found.');
		process.exit();
	}
}
