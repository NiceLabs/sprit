const _ = require('lodash')
const {PNG} = require('pngjs')

const toBuffer = canvas => ({
  contents: PNG.sync.write(canvas),
  type: 'png',
  mimeType: 'image/png',
  width: canvas.width,
  height: canvas.height
})

const handleTile = (dst, {x, y, offset, contents}) => {
  const src = PNG.sync.read(contents)
  PNG.bitblt(src, dst, 0, 0, src.width, src.height, x + offset, y + offset)
}

module.exports = {
  async create (tiles, options) {
    const {width, height} = options
    const canvas = new PNG({width, height})
    _.forEach(tiles, _.partial(handleTile, canvas))
    return toBuffer(canvas)
  },
  async scale (base, options) {
    throw new Error('scale not supported')
  }
}
