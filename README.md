# hops

## About

A CLI tool for installing and managing [Homebrew](https://brew.sh) packages. Written in TypeScript, and powered by Bun. This is not a standalone package manager, and requires Homebrew to be installed on your machine.

## Usage

### Installing Packages

You can search for and install packages by running hops without any flags, or with the `--add` flag.

### Uninstalling Packages

You can uninstall Homebrew packages by running hops with the `--remove` flag. Additionally, when uninstalling casks, you can "zap", or remove all associated files, by including the `--zap` flag.

### Updating Packages

You can add Homebrew taps by running hops with the `--update` flag.

### Adding Taps

You can add Homebrew taps by running hops with the `--tap` flag.

## Building From Source

_Note: You must have Bun v1.0.18 or higher installed, earlier versions have a bug that causes the program to exit prematurely._

From the project directory, run `bun run build`. This will create a `/build` directory containing the executable for hops.

## Dependencies

- [prompts](https://github.com/terkelg/prompts)
- [ora](https://github.com/sindresorhus/ora)
- [chalk](https://github.com/chalk/chalk)
