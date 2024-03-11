import ora from 'ora';

// search homebrew for packages that match query
export default async (query: string) => {
  const { stdout } = Bun.spawn([
    'brew',
    'desc',
    '--formula',
    '--name',
    query,
    '--eval-all',
  ]);

  const spinner = ora('Searching Homebrew...').start();

  const output = await new Response(stdout).text();

  const results = output
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

  if (!results) {
    spinner.fail('There was a problem...');
    return null;
  } else if (results.length < 1) {
    spinner.fail('No packages found.');
    return null;
  }

  spinner.succeed(`${results.length} packages found!`);

  return results;
};
