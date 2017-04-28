const _ = require('lodash')

// @formatter:off
// language=LESS
const utils = `
.sprite-width(@sprite) {
  width: extract(@sprite, 1);
}

.sprite-height(@sprite) {
  height: extract(@sprite, 2);
}

.sprite-position(@sprite) {
  /* dimension / (layoutDimension - containerDimension) */
  background-position: @x @y;

  @imageWidth: extract(@sprite, 1);
  @imageHeight: extract(@sprite, 2);
  @imageX: extract(@sprite, 3);
  @imageY: extract(@sprite, 4);
  @layoutWidth: extract(@sprite, 5);
  @layoutHeight: extract(@sprite, 6);

  @x: unit((@imageX / (@layoutWidth - @imageWidth)) * 100, %);
  @y: unit((@imageY / (@layoutHeight - @imageHeight)) * 100, %);
}

.sprite-size(@sprite, @size) {
  /* (layoutDimension * (elementDimension / containerDimension)) / elementDimension */
  background-size: @x-size @y-size;

  @imageWidth: extract(@sprite, 1);
  @imageHeight: extract(@sprite, 2);
  @layoutWidth: extract(@sprite, 5);
  @layoutHeight: extract(@sprite, 6);

  @x-size: unit((@layoutWidth * (@size / @imageWidth) / @size) * 100, %);
  @y-size: unit((@layoutHeight * (@size / @imageHeight) / @size) * 100, %);
}
`
// @formatter:on

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
      '// @formatter:on',
      utils
    ]
    return target.join('\n').replace(/\t/g, _.repeat(' ', 2))
  }
}
