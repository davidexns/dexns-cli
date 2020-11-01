import { ProjectType } from '../constants/globals'

export default function(
  type: ProjectType
): Record<string, ReadonlyArray<string>> {
  switch (type) {
    case 'sapper':
      return {
        '*.{js,ts}': ['eslint'],
        '*.{js,ts,json,svelte,md}': [
          'prettier --write --plugin-search-dir=.',
          'git add',
        ],
      }
    // All other options are React right now
    default:
      return {
        '*.{js,ts,tsx}': ['eslint'],
        '*.{js,ts,tsx,json,md}': ['prettier --write', 'git add'],
      }
  }
}
