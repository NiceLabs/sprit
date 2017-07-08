// see http://www.jingjingke.com/c/28134.html

exports.getRelativeBackgroundPosition = (layout, container, dimension) => {
  const position = (dimension / (layout - container)) * 100
  if (position === 0) return 0
  return Number.parseFloat(position.toFixed(3))
}

exports.getRelativeBackgroundSize = (layout, container, element = 1) => {
  const size = ((layout * (element / container)) / element) * 100
  if (size === 0) return 0
  return Number.parseFloat(size.toFixed(3))
}
