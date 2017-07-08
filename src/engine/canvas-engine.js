const Canvas = require('node-require-fallback')('canvas', 'canvas-prebuilt')

if (Canvas === null) throw new Error('require install "canvas" or "canvas-prebuilt".')

const toBuffer = canvas => ({
  contents: canvas.toBuffer(),
  type: 'png',
  mimeType: 'image/png',
  width: canvas.width,
  height: canvas.height
})

const getImage = ({contents}) => Object.assign(new Canvas.Image(), {src: contents})

const handleTile = (context, {x, y, offset, contents}) => {
  context.drawImage(
    getImage({contents}),
    x + offset,
    y + offset
  )
}

module.exports = {
  async create (tiles, {width, height}) {
    const canvas = new Canvas(width, height)
    const context = canvas.getContext('2d')
    tiles.forEach(tile => handleTile(context, tile))

    return toBuffer(canvas)
  },
  async scale (base, {scale = 1}) {
    const image = getImage(base)
    const width = image.width * scale
    const height = image.height * scale
    const canvas = new Canvas(width, height)
    if (scale >= 1) return toBuffer(canvas)

    canvas.getContext('2d')
      .drawImage(image, 0, 0, width, height)

    return toBuffer(canvas)
  }
}
