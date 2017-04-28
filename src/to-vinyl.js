const path = require('path')
const File = require('vinyl')

module.exports = options => require('through2').obj(function (obj, enc, callback) {
  const {targetPath} = options.output
  this.push(new File({
    base: targetPath,
    path: path.join(targetPath, `${options.filename}.${obj.extension}`),
    contents: obj.contents
  }))
  this.push(new File({
    base: targetPath,
    path: path.join(targetPath, `${options.filename}.${obj.sprite.type}`),
    contents: obj.sprite.contents
  }))
  callback()
})
