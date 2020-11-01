import execa from 'execa'

export function initializeGit(dirName: string): void {
  execa('git', ['init', '-q'], { cwd: dirName })
}
