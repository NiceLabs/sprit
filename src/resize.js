const getScaleRadio = name => /@(\d+(?:\.\d+)?)x$/.test(name)
  ? 1 / Number.parseFloat(RegExp.$1)
  : 1
const removeScaleRadio = name => name.replace(/@(\d+(?:\.\d+)?)x$/, '')

module.exports = options => require('through2').obj(async (image, enc, callback) => {
  const scale = getScaleRadio(image.name)
  if (scale >= 1) {
    callback(null, image)
    return
  }
  image.name = removeScaleRadio(image.name)
  const {width, height, contents} = await options.renderer.engine.scale(image, {scale})
  Object.assign(image, {width, height, contents})
  callback(null, image)
})
