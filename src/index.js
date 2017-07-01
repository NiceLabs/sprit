const _ = require('lodash')
const vfs = require('vinyl-fs')

const defaults = {
  filename: 'sprite',
  renderer: {
    engine: require('./engine/png-engine'),
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  layout: {
    margin: 0,
    options: {sort: true},
    algorithm: 'binary-tree'
  },
  output: {
    format: 'png',
    targetPath: process.cwd(),
    processor: require('./processor/json-processor')
  }
}

const src = options => {
  options = _.defaultsDeep(options, defaults)
  return vfs.src(options.src)
    .pipe(require('./tile')(options))
    .pipe(require('./layout')(options))
    .pipe(require('./sprite')(options))
    .pipe(require('./process')(options))
    .pipe(require('./to-vinyl')(options))
}

const create = options => src(options)
  .pipe(vfs.dest(file => file.base))

module.exports = {
  create,
  src
}
