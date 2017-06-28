const _ = require('lodash')

const mapping = {
  lwip: require.resolve('./lwip-engine'),
  canvas: require.resolve('./canvas-engine'),
  png: require.resolve('./png-engine')
}

exports.loadEngine = engine => {
  if (_.isString(engine)) {
    engine = mapping[engine.toLowerCase()]
    if (!_.isUndefined(engine)) {
      return require(engine)
    }
  }
  if (isEngine(engine)) {
    return engine
  }
  throw new Error(`engine not found (${_.keys(mapping).join(', ')})`)
}

function isEngine (engine) {
  return _.isObject(engine) &&
    _.isFunction(engine.create) &&
    _.isFunction(engine.scale)
}
