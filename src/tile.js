const path = require('path')
const imageSize = require('image-size')
const imageType = require('image-type')

const replaceSep = name => name.replace(/[\\/ ]/g, '-')

module.exports = options => require('through2').obj((image, enc, callback) => {
  const {height, width} = imageSize(image.contents)
  const type = imageType(image.contents)['ext']
  callback(null, {
    base: image.base,
    type,
    name: path.parse(replaceSep(image.relative)).name,
    width,
    height,
    contents: image.contents,
    path: image.path,
    fileName: image.relative
  })
})
