const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const options = {
  recursive: true
}

module.exports = {
  reset (from) {
    return rimraf.sync(from)
  },
  read (from) {
    return fs.readFileSync(from).toString()
  },
  write (to, data) {
    fs.mkdirSync(path.dirname(to), options)
    fs.writeFileSync(to, data)

    return this
  }
}
