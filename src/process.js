const _ = require('lodash')
const Promise = require('bluebird')

const getExtensionName = (extension, options) => {
  if (_.isString(extension)) return extension
  if (_.isFunction(extension)) return extension(options)
  return ''
}

const createProcess = options => function (layout, enc, callback) {
  const {processor} = options.output
  Promise.try(() => processor.process(layout, options))
    .then(contents => {
      this.push({
        contents: new Buffer(contents, 'utf-8'),
        extension: getExtensionName(processor.extension, options),
        sprite: layout.sprite
      })
      callback()
    })
    .catch(error => callback(error, null))
}

module.exports = options => require('through2').obj(createProcess(options))
