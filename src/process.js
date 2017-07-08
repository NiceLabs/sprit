const _ = require('lodash')
const Promise = require('bluebird')

const getExtensionName = (extension, options) => {
  if (_.isString(extension)) return extension
  if (_.isFunction(extension)) return extension(options)
  return ''
}

const createProcess = options => async function (layout, enc, callback) {
  const {processor} = options.output
  const contents = await Promise.try(() => processor.process(layout, options))
  this.push({
    contents: Buffer.from(contents, 'utf-8'),
    extension: getExtensionName(processor.extension, options),
    sprite: layout.sprite
  })
  callback()
}

module.exports = options => require('through2').obj(createProcess(options))
