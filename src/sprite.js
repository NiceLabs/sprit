const _ = require('lodash')
const Color = require('color')

const renderSprite = (options, layout) => {
  const tiles = _.map(
    layout.items,
    ({x, y, meta}) => _.assign(
      {x, y, offset: options.layout.margin},
      _.pick(meta, ['type', 'path', 'height', 'width', 'contents'])
    )
  )
  return options.renderer.engine.create(tiles, {
    width: layout.width,
    height: layout.height,
    bgColor: Color(options.renderer.backgroundColor).array(),
    options
  })
}

const createSprite = (layout, options) => renderSprite(options, layout)
  .then(response => _.pick(response, ['type', 'contents']))

module.exports = options => require('through2').obj((layout, enc, callback) => {
  createSprite(layout, options)
    .then(sprite => callback(null, _.merge({sprite}, layout)))
    .catch(error => callback(error, null))
})
