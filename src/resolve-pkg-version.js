import { dirname } from 'path'
import readPkgUp from 'read-pkg-up'
import resolve from 'resolve'
import fs from 'fs'

// TODO: move this into its own npm module
export default (dep) => {
  try {
    const basedir = fs.realpathSync(process.cwd())
    const depPath = resolve.sync(dep, { basedir })
    const { pkg } = readPkgUp.sync({ cwd: dirname(depPath) })

    if (pkg.name === dep) {
      return pkg.version
    }
  } catch (err) { }
}
