# hops

## About

A CLI tool for searching and installing [Homebrew](https://brew.sh) packages. Written in TypeScript, and powered by Bun.

## Building From Source

_Note: You must have Bun v1.0.18 or higher installed, earlier versions have a bug that causes the program to exit prematurely._

From the project directory, run `bun run build`. This will create a `/build` directory containing the executable for hops.

## Dependencies

- [prompts](https://github.com/terkelg/prompts)
- [ora](https://github.com/sindresorhus/ora)
- [chalk](https://github.com/chalk/chalk)
