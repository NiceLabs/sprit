// see http://www.jingjingke.com/c/28134.html

exports.getRelativeBackgroundPosition = (layoutDimension, containerDimension, dimension) => {
  const position = dimension / (layoutDimension - containerDimension)
  if (position === 0) return '0'
  return `${Number.parseFloat((position * 100).toFixed(3))}%`
}

exports.getRelativeBackgroundSize = (layoutDimension, containerDimension, elementDimension) => {
  const position = (layoutDimension * (elementDimension / containerDimension)) / elementDimension
  if (position === 0) return '0'
  return `${Number.parseFloat((position * 100).toFixed(3))}%`
}
