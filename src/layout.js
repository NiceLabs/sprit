const _ = require('lodash')
const {PackingSmith, algorithms} = require('layout')

const LAYOUT = Symbol('layout')

const getAlgorithm = name => algorithms[name] || algorithms['binary-tree']

const addTile = options => (tile, enc, callback) => {
  const layout = _.get(options, 'layout', {})
  if (_.isNil(options[LAYOUT])) {
    options[LAYOUT] = new PackingSmith(
      getAlgorithm(layout.algorithm),
      _.get(layout, 'options', {sort: true})
    )
  }
  options[LAYOUT].addItem({
    meta: tile,
    width: tile.width + 2 * options.layout.margin,
    height: tile.height + 2 * options.layout.margin
  })
  callback()
}

const pushLayouts = options => function (callback) {
  this.push(options[LAYOUT].export())
  callback()
}

module.exports = options => require('through2').obj(
  addTile(options),
  pushLayouts(options)
)
