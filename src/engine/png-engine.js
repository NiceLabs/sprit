const Promise = require('bluebird')
const {PNG} = require('pngjs')

module.exports = {
  async create (tiles, options) {
    const canvas = new PNG({width: options.width, height: options.height})
    const handleTile = tile => {
      const png = PNG.sync.read(tile.contents)
      PNG.bitblt(
        png,
        canvas,
        0,
        0,
        png.width,
        png.height,
        tile.x + tile.offset,
        tile.y + tile.offset
      )
      return png
    }
    await Promise.map(tiles, handleTile)
    return {
      contents: PNG.sync.write(canvas),
      type: 'png',
      mimeType: 'image/png',
      width: canvas.width,
      height: canvas.height
    }
  },
  async scale (base, options) {
    throw new Error('scale not supported')
  }
}
