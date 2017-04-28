const path = require('path')
const Promise = require('bluebird')

const replaceSep = name => name.replace(/[\\/ ]/g, '-')

module.exports = options => require('through2').obj((image, enc, callback) => {
  Promise.promisify(require('image-info'))(image.path)
    .then(({height, width, type}) => ({
      base: image.base,
      type,
      name: path.parse(replaceSep(image.relative)).name,
      width,
      height,
      contents: image.contents,
      path: image.path,
      fileName: image.relative
    }))
    .then(tile => callback(null, tile))
    .catch(err => callback(err, null))
})
