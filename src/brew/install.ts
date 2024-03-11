import ora from 'ora';

// search homebrew for packages that match query
export default async (name: string) => {
  const { stdout } = Bun.spawn(['brew', 'install', name]);

  const spinner = ora(`Installing ${name}...`).start();

  const output = await new Response(stdout).text();

  if (output.includes('ERROR')) {
    spinner.fail('There was a problem...');
    return;
  }

  spinner.succeed(`Successfully installed ${name}!`);
};
