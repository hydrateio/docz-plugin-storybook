import { dirname } from 'path'
import readPkgUp from 'read-pkg-up'
import resolve from 'resolve'
import paths from './paths'

/*
export default (dep) => {
  const { pkg } = readPkgUp.sync()

  const deps = Object.entries(pkg.dependencies || { })
  const depMatch = deps.find((d) => d[0] === dep)
  if (depMatch) return depMatch[1]

  const devDeps = Object.entries(pkg.devDependencies || { })
  const devDepMatch = devDeps.find((d) => d[0] === dep)
  if (devDepMatch) return devDepMatch[1]
}
*/

// TODO: move this into its own npm module
export default (dep) => {
  try {
    const depPath = resolve.sync(dep, { basedir: paths.root })
    const { pkg } = readPkgUp.sync({
      cwd: dirname(depPath)
    })

    if (pkg.name === dep) {
      return pkg.version
    }
  } catch (err) { }
}
