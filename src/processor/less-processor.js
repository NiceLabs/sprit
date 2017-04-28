const _ = require('lodash')

const tplWidth = '.sprite-width(@sprite)    { width: extract(@sprite, 1);  }'
const tplHeight = '.sprite-height(@sprite)   { height: extract(@sprite, 2); }'
const tplPosition = `.sprite-position(@sprite) {
  /* dimension / (layoutDimension - containerDimension) */
  @x: extract(@sprite, 3) / (extract(@sprite, 5) - extract(@sprite, 1));
  @y: extract(@sprite, 4) / (extract(@sprite, 6) - extract(@sprite, 2));
  background-position: @x @y;
}`
const tplSize = `.sprite-size(@sprite, @size) {
  /* (layoutDimension * (elementDimension / containerDimension)) / elementDimension */
  @x-size: (extract(@sprite, 5) * (extract(@sprite, 3) / extract(@sprite, 1))) / extract(@sprite, 3);
  @y-size: (extract(@sprite, 6) * (extract(@sprite, 4) / extract(@sprite, 2))) / extract(@sprite, 4);
  background-size: @x-size @y-size;
}`

module.exports = {
  extension: 'less',
  process (layout, options) {
    const prefix = _.get(options, 'output.prefix', '')
    const nameMaxLength = _.max(_.map(layout.items, 'meta.name.length'))
    const mappings = _.map(layout.items, item => {
      const values = [
        _.padEnd(`@${prefix}${item.meta.name}:`, nameMaxLength + prefix.length + 2),
        _.padEnd(item.width, 3),
        _.padEnd(item.height, 3),
        _.padEnd(item.x, 4),
        _.padEnd(item.y, 4),
        layout.width,
        layout.height
      ]
      return `${values.join('\t')};`
    })
    const target = [
      '// @formatter:off',
      ...mappings,
      '',
      tplWidth, tplHeight, tplPosition, tplSize
    ]
    return target.join('\n').replace(/\t/g, _.repeat(' ', 2))
  }
}
