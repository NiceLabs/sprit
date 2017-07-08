const Promise = require('bluebird')
const lwip = require('node-require-fallback')('lwip', 'pajk-lwip')

if (lwip === null) throw new Error('require install "lwip" or "pajk-lwip".')

Promise.promisifyAll(lwip)

const toBuffer = async canvas => {
  const type = 'png'
  const mimeType = `image/${type}`
  const contents = await canvas.toBufferAsync(type, {})
  const width = canvas.width()
  const height = canvas.height()
  return {type, mimeType, contents, width, height}
}

const handleTile = async (canvas, {x, y, offset, contents, type}) => {
  await canvas.pasteAsync(
    x + offset,
    y + offset,
    await lwip.openAsync(contents, type)
  )
}

module.exports = {
  async create (tiles, options) {
    const canvas = await lwip.createAsync(options.width, options.height, options.bgColor)
    Promise.promisifyAll(canvas)
    await Promise.each(tiles, tile => handleTile(canvas, tile))
    return toBuffer(canvas, options)
  },
  async scale ({contents, type}, {scale = 1, interpolation = 'lanczos'}) {
    const canvas = await lwip.openAsync(contents, type)
    Promise.promisifyAll(canvas)
    const scaled = await canvas.scaleAsync(scale, interpolation)
    return toBuffer(scaled)
  }
}
