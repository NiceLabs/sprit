const _ = require('lodash')
const {getRelativeBackgroundPosition} = require('./utils')

module.exports = {
  extension: 'json',
  process (layout) {
    const relBgPos = getRelativeBackgroundPosition
    const data = {
      width: layout.width,
      height: layout.height,
      items: _.map(layout.items, item => ({
        name: item.meta.name,
        width: item.width,
        height: item.height,
        absolute: {
          x: item.x,
          y: item.y
        },
        relative: {
          x: relBgPos(layout.width, item.width, item.x),
          y: relBgPos(layout.height, item.height, item.y)
        }
      }))
    }
    return JSON.stringify(data, null, 2)
  }
}
