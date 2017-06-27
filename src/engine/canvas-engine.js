const Promise = require('bluebird')
const Canvas = require('node-require-fallback')('canvas-prebuilt', 'canvas')

if (Canvas === null) {
  throw new Error('require install "canvas-prebuilt" or "canvas".')
}

const getImage = (tile) => new Promise((resolve) => {
  const img = new Canvas['Image']()
  img.src = tile.contents
  resolve(img)
})

const exportImage = canvas => ({
  contents: Buffer.from(canvas.toBuffer()),
  type: 'png',
  mimeType: 'image/png',
  width: canvas.width,
  height: canvas.height
})

const resize = (tile, {width, height}) => {
  return getImage(tile)
    .then(img => {
      const canvas = new Canvas(width, height)
      canvas.getContext('2d')
        .drawImage(img, 0, 0, width, height)
      return canvas
    })
    .then(exportImage)
}

module.exports = {
  create (tiles, options) {
    const canvas = new Canvas(options.width, options.height)
    const ctx = canvas.getContext('2d')

    const handleTile = (tile) => getImage(tile, options)
      .then(img => ctx.drawImage(img, tile.x + tile.offset, tile.y + tile.offset))

    return Promise.map(tiles, handleTile, {concurrency: 1})
      .then(() => exportImage(canvas))
  },
  scale (base, options) {
    return resize(base, options)
  }
}
