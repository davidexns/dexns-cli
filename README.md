# dexns-cli

This CLI is a work in progress. The goal of this CLI is to scaffold projects with extra batteries included to reduce the amount of time spent getting my DX configurations in place.

## Running the CLI locally

Currently, the `start` script does not run the CLI, as its contents were leftover from an earlier attempt at a CLI and haven't been updated to run with the current state.

If you clone the repository and run `yarn link` or `npm link`, the CLI can then be run with the `dexns` command

## TODO

- [ ] Parse command line arguments instead of needing to go through the prompted flow
- [ ] Additional Next and Gatsby project-specific setup
- [ ] Options for Cypress and TypeScript configuration
- [ ] Safeguards and error handling for directories already existing, etc
