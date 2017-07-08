const _ = require('lodash')

module.exports = {
  extension: 'json',
  process ({width, height, items}) {
    const data = {
      width: width,
      height: height,
      items: _.map(items, item => _.merge(
        {name: item.meta.name},
        _.pick(item, ['x', 'y', 'width', 'height'])
      ))
    }
    return JSON.stringify(data, null, 2)
  }
}
