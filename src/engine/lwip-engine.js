const _ = require('lodash')
const Promise = require('bluebird')
const lwip = require('node-require-fallback')('lwip', 'pajk-lwip')

if (lwip === null) {
  throw new Error('require install "lwip" or "pajk-lwip".')
}

const paste = ({x, y, offset, contents, type}, canvas) => {
  return Promise.promisify(lwip.open)(contents, type)
    .then(img => Promise.promisify(canvas.paste.bind(canvas))(x + offset, y + offset, img))
    .return(canvas)
}

const toBuffer = (canvas, options) => {
  const format = _.get(options, 'output.format', 'png')
  return Promise.promisify(canvas.toBuffer.bind(canvas))(format, {})
    .then(content => ({
      type: format,
      mimeType: `image/${format}`,
      contents: content,
      width: canvas.width(),
      height: canvas.height()
    }))
}

const scaleImage = (base, type, options) => Promise.promisify(lwip.open)(base, type)
  .then(img => {
    const interpolation = _.get(options, 'lwip-interpolation') || 'lanczos'
    return Promise.promisify(img.scale)(options.scale, interpolation)
  })

module.exports = {
  create (tiles, options) {
    return Promise.promisify(lwip.create)(options.width, options.height, options.bgColor)
      .then(color => Promise.map(tiles, tile => paste(tile, color), {concurrency: 1}))
      .then(color => toBuffer(_.head(color), options))
  },
  scale ({contents, type}, options) {
    return scaleImage(contents, type, options)
      .then(image => toBuffer(image, options))
  }
}
