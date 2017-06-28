const _ = require('lodash')
const {PNG} = require('pngjs')

function handleTile (dst, tile) {
  const src = PNG.sync.read(tile.contents)
  PNG.bitblt(src, dst, 0, 0, src.width, src.height, tile.x + tile.offset, tile.y + tile.offset)
}

module.exports = {
  async create (tiles, options) {
    const {width, height} = options
    const canvas = new PNG({width, height})
    _.forEach(tiles, _.partial(handleTile, canvas))
    const contents = PNG.sync.write(canvas)

    const type = 'png'
    const mimeType = `image/${type}`
    return {contents, type, mimeType, width, height}
  },
  async scale (base, options) {
    throw new Error('scale not supported')
  }
}
