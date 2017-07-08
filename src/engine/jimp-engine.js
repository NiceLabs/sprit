const Promise = require('bluebird')
const Jimp = require('jimp')

const toBuffer = async canvas => {
  const mimeType = Jimp.MIME_PNG
  const contents = await Promise.promisify(canvas.getBuffer.bind(canvas))(mimeType)
  return {
    type: 'png',
    mimeType,
    contents,
    width: canvas.bitmap.width,
    height: canvas.bitmap.height
  }
}

const handleTile = async (canvas, {x, y, offset, contents}) => {
  await canvas.composite(
    await Jimp.read(contents),
    x + offset,
    y + offset
  )
}

module.exports = {
  async create (tiles, {width, height}) {
    const canvas = new Jimp(width, height)
    await Promise.each(tiles, tile => handleTile(canvas, tile))
    return toBuffer(canvas)
  },
  async scale ({contents}, {scale = 1}) {
    const canvas = await Jimp.read(contents)
    const scaled = await canvas.scale(scale)
    return toBuffer(scaled)
  }
}
