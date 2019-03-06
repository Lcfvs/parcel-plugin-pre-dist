const listener = require('./listener')

module.exports = function ParcelPreDistPlugin (bundler) {
  const dist = bundler.options.publicURL
  const root = bundler.options.rootDir

  if (dist !== root) {
    bundler.on('bundled', listener(bundler, root, dist))
  }
}
