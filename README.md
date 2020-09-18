# dexns-cli

This CLI is a work in progress. The goal of this CLI is to scaffold projects with extra batteries included to reduce the amount of time spent getting my DX configurations in place.

## Running the CLI locally

If you clone the repository and run `yarn link` or `npm link`, the CLI can then be run with the `dexns` command

## TODO

- [x] Parse command line arguments instead of needing to go through the prompted flow
- [x] Catch projectTypes that do not match being passed via command line
- [ ] Add pre-push eslint hook to default husky config
- [x] Include TypeScript by default
- [ ] ESLint rule for react in jsx scope not needed when starting Next project
- [x] eslint-plugin-jsx-a11y
- [ ] Additional Next and Gatsby project-specific setup
- [ ] Options for Cypress and TypeScript configuration
- [ ] Safeguards and error handling for directories already existing, etc
- [ ] Separate adding of dependencies to a specific script so just that piece can be run
