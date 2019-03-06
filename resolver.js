const path = require('path')
const URL = require('url')
const process = require('process')

module.exports = {
  cwd: process.cwd(),
  join (directory, ...files) {
    return path.join(directory, ...files)
  },
  relative (file) {
    return path.relative(this.cwd, file).split(path.sep).slice(1)
  },
  resolve (map, name, asset) {
    const segments = this.relative(asset.name)

    return {
      name: name,
      basename: path.basename(name),
      relative: asset.relativeName,
      src: this.join(map.root, asset.relativeName),
      dist: this.join(this.cwd, map.dist, ...segments),
      dirname: this.join(this.cwd, map.dist, ...segments, '..'),
      url: URL.pathToFileURL(['/', ...segments].join('/')).pathname
        .concat('?', Date.now().toString(10))
    }
  }
}
