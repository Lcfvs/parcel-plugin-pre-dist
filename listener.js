const isset = require('./isset')
const fs = require('./fs')
const resolver = require('./resolver')
const transformer = require('./transformer')

const prototype = {
  flat (bundle) {
    if (this.isMappable(bundle.name, bundle.type, bundle.entryAsset)) {
      this.register(bundle)
    }

    bundle.childBundles.forEach(this.flat, this)

    return this
  },
  register (bundle) {
    const resolved = resolver.resolve(this, bundle.name, bundle.entryAsset)

    this.map.set(bundle.entryAsset.relativeName, Object.assign(resolved, {
      type: bundle.type
    }))

    return this
  },
  forEach (callback, context) {
    this.map.forEach(callback, context)

    return this
  },
  isMappable (name, type, asset) {
    return isset(name) &&
      isset(type) &&
      isset(asset) &&
      !this.map.has(name)
  },
  parse (bundle) {
    this.map = new Map()

    return this
      .flat(bundle)
      .transform()
  },
  transform () {
    fs.reset(resolver.join(resolver.cwd, this.dist))

    return this.forEach(bundle => {
      (transformer[bundle.type] || transformer.default)(this.map, bundle)
    })
  }
}

module.exports = function listener (bundler, root, dist) {
  return function (bundle) {
    return Object.assign({}, prototype, {
      bundler,
      dist,
      root
    }).parse(bundle)
  }
}
