import chalk from 'chalk';
import { render } from 'ink';
import React from 'react';

import App from './app';

// is homebrew installed?
const homebrewInstalled = brewCheck();

if (!homebrewInstalled) {
  console.log(
    chalk.red(
      'Homebrew not installed. Visit https://brew.sh for setup instructions.',
    ),
  );
  process.exit();
}

render(<App />);

// determine if homebrew is installed
function brewCheck() {
  try {
    Bun.spawn(['brew', '-v']);

    return true;
  } catch {
    return false;
  }
}
