import execa from 'execa'

export function openProject(dirName: string): void {
  execa('code', ['.'], { cwd: dirName })
}
