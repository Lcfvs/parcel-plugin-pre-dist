const htmlize = require('htmlize')
const fs = require('./fs')

const pattern = /\/index\.html$/

const href = [
  'a',
  'area',
  'base',
  'link'
]

const src = [
  'audio',
  'embed',
  'iframe',
  'img',
  'input',
  'script',
  'source',
  'track',
  'video'
]

const all = [...href, ...src].join(',')

function transform (map, entry) {
  fs.write(entry.dist, fs.read(entry.name))

  return entry
}

function css (map, entry) {
  let data = fs.read(entry.name)

  map.forEach(entry => {
    data = data.split(entry.basename).join(entry.url)
  })

  fs.write(entry.dist, data)

  return entry
}

function html (map, entry) {
  const document = htmlize(fs.read(entry.src))

  Array.from(document.querySelectorAll(all))
    .forEach(rewrite, map)

  Array.from(document.getElementsByTagName('*'))
    .forEach(element => (element.namespaceURI = ''))

  fs.write(entry.dist, document.clean().toString(true))

  return entry
}

function rewrite (element) {
  const name = element.nodeName.toLowerCase()
  const attribute = href.indexOf(name) > -1 ? 'href' : 'src'
  const value = element.getAttribute(attribute)
  const asset = this.get(value)

  if (asset && asset.type !== 'html') {
    element.setAttribute(attribute, asset.url)

    return
  }

  element.setAttribute(attribute, value.replace(pattern, ''))
}

module.exports = {
  css,
  html,
  js: transform,
  default: transform
}
