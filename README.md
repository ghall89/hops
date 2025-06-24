# hops

## About

A TUI application for installing and managing [Homebrew](https://brew.sh) packages. Written in TypeScript, and powered by Bun. This is not a standalone package manager, and requires Homebrew to be installed on your machine.

## Building From Source

_Note: You must have Bun v1.0.18 or higher installed, earlier versions have a bug that causes the program to exit prematurely._

From the project directory, run `bun run build`. This will create a `/build` directory containing the executable for hops.

## Dependencies

- [ink](https://github.com/vadimdemedes/ink)
- [zustand](https://github.com/pmndrs/zustand)
