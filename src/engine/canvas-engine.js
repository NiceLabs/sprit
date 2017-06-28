const _ = require('lodash')
const Canvas = require('node-require-fallback')('canvas', 'canvas-prebuilt')

if (Canvas === null) throw new Error('require install "canvas" or "canvas-prebuilt".')

const toBuffer = canvas => ({
  contents: Buffer.from(canvas.toBuffer()),
  type: 'png',
  mimeType: 'image/png',
  width: canvas.width,
  height: canvas.height
})

const getImage = ({contents}) => {
  const image = new Canvas.Image()
  image.src = contents
  return image
}

const handleTile = (context, {x, y, offset, contents}) => {
  context.drawImage(getImage({contents}), x + offset, y + offset)
}

module.exports = {
  async create (tiles, {width, height}) {
    const canvas = new Canvas(width, height)
    const context = canvas.getContext('2d')
    _.forEach(tiles, _.partial(handleTile, context))

    return toBuffer(canvas)
  },
  async scale (base, {width, height}) {
    const canvas = new Canvas(width, height)
    const context = canvas.getContext('2d')
    context.drawImage(getImage(base), 0, 0, width, height)

    return toBuffer(canvas)
  }
}
