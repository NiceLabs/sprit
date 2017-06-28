const _ = require('lodash')
const Promise = require('bluebird')
const Jimp = require('jimp')

const toBuffer = async canvas => {
  const mimeType = Jimp.MIME_PNG
  const contents = await canvas.getBufferAsync(mimeType)
  return {
    type: 'png',
    mimeType,
    contents,
    width: canvas.bitmap.width,
    height: canvas.bitmap.height
  }
}

const handleTile = async (canvas, {x, y, offset, contents}) => {
  await canvas.compositeAsync(
    await Jimp.read(contents),
    x + offset,
    y + offset
  )
}

module.exports = {
  async create (tiles, {width, height}) {
    const canvas = new Jimp(width, height)
    Promise.promisifyAll(canvas)
    await Promise.each(tiles, _.partial(handleTile, canvas))
    return toBuffer(canvas)
  },
  async scale (base, {scale = 0}) {
    const image = await Jimp.read(base.contents)
    const scaled = await image.scale(scale)
    return toBuffer(scaled)
  }
}
