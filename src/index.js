const _ = require('lodash')
const vfs = require('vinyl-fs')
const engineUtils = require('./engine/utils')

const defaults = {
  filename: 'sprite',
  renderer: {
    engine: null,
    backgroundColor: 'rgba(255, 255, 255, 0)'
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

const setEngine = (options) => {
  let engine = _.get(options, 'renderer.engine')
  if (_.isNil(engine)) {
    engine = require('./engine/canvas-engine')
  } else {
    engine = engineUtils.loadEngine(engine)
  }
  _.set(options, 'renderer.engine', engine)
}

const src = options => {
  options = _.defaultsDeep(options, defaults)
  setEngine(options)
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
