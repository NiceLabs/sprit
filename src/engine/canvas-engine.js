const Promise = require('bluebird')
const Canvas = require('node-require-fallback')('canvas', 'canvas-prebuilt')

if (Canvas === null) throw new Error('require install "canvas" or "canvas-prebuilt".')

const toBuffer = canvas => ({
  contents: Buffer.from(canvas.toBuffer()),
  type: 'png',
  mimeType: 'image/png',
  width: canvas.width,
  height: canvas.height
})

const getImage = async ({contents}) => {
  const image = new Canvas.Image()
  image.src = contents
  return image
}

module.exports = {
  async create (tiles, {width, height}) {
    const canvas = new Canvas(width, height)
    const ctx = canvas.getContext('2d')
    const handleTile = async ({x, y, offset, contents}) => {
      const image = await getImage({contents})
      ctx.drawImage(image, x + offset, y + offset)
    }

    await Promise.each(tiles, handleTile)

    return toBuffer(canvas)
  },
  async scale (base, {width, height}) {
    const image = await getImage(base)

    const canvas = new Canvas(width, height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, width, height)

    return toBuffer(canvas)
  }
}
