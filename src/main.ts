import chalk from 'chalk';
import { installPackage } from './workflows';
import { brewCheck } from './brew';

const main = async () => {
  // is homebrew installed?
  const homebrewInstalled = await brewCheck();

  if (!homebrewInstalled) {
    console.log(
      chalk.red(
        'Homebrew not installed. Visit https://brew.sh for setup instructions.',
      ),
    );
  }

  await installPackage();
};

main();
