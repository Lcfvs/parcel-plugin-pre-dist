# <a name="reference">parcel-plugin-pre-dist</a>

A parcel plugin to distinct the pre-dist (for parcel HMR) and a clean dist (for the prod)

## <a name="install">Install</a>

`npm i -D parcel-plugin-pre-dist`

## <a name="warning">Warning</a>

* **Be sure to have your sources directory as a project subdirectory, like `%project-dir%/src`**
* Requires valid XHTML attributes, e.g. `<input required="required" />` in place of `<input required />`

## <a name="usage">Usage</a>

### <a name="dev">Dev</a>

```sh
parcel src/html/index.html --open --out-dir=./pre-dist
```

### <a name="prod">Prod</a>

```sh
parcel build src/html/index.html --out-dir=./pre-dist --public-url=./dist
```

## <a name="license">License</a>

[MIT](https://github.com/Lcfvs/parcel-plugin-pre-dist/blob/master/licence.md)
