const _ = require('lodash')
const Promise = require('bluebird')
const lwip = require('node-require-fallback')('lwip', 'pajk-lwip')

if (lwip === null) throw new Error('require install "lwip" or "pajk-lwip".')

const lwipCreate = Promise.promisify(lwip['create'])
const lwipOpen = Promise.promisify(lwip['open'])

const toBuffer = async (canvas, options) => {
  const toBuffer = Promise.promisify(canvas.toBuffer.bind(canvas))

  const type = _.get(options, 'output.format', 'png')
  const mimeType = `image/${type}`
  const contents = await toBuffer(type, {})
  const width = canvas.width()
  const height = canvas.height()

  return {type, mimeType, contents, width, height}
}

const handleTile = async (canvas, {x, y, offset, contents, type}) => {
  const image = await lwipOpen(contents, type)
  const paste = Promise.promisify(canvas.paste.bind(canvas))

  await paste(x + offset, y + offset, image)
}

module.exports = {
  async create (tiles, options) {
    const image = await lwipCreate(options.width, options.height, options.bgColor)
    await Promise.each(tiles, _.partial(handleTile, image))
    return toBuffer(image, options)
  },
  async scale ({contents, type}, options) {
    const interpolation = _.get(options, 'lwip-interpolation') || 'lanczos'

    const image = await lwipOpen(contents, type)
    const scale = Promise.promisify(image.scale)

    const scaled = await scale(options.scale, interpolation)
    return toBuffer(scaled, options)
  }
}
