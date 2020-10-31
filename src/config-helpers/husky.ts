import { ProjectType } from '../typings/globals'

export default function(
  type: ProjectType
): { hooks: Record<'pre-commit' | 'pre-push', string> } {
  return {
    hooks: {
      'pre-commit':
        type === 'sapper' ? 'lint-staged && svelte-check' : 'lint-staged',
      'pre-push': 'npm run lint',
    },
  }
}
