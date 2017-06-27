# sprit

> Generates sprites and proper style files out of a directory of images.

> Supports different image engines

## Usage

### Programmatic usage

```js
require('sprit').create({
  src: [
    './icons/*.png', // include files
    '!./icons/ignore-*.png' // ignore files
  ],
  renderer: {
    engine: require('sprit/src/engine/png-engine')
  },
  layout: {
    margin: 2
  },
  output: {
    targetPath: './src/sprite',
    processor: require('sprit/src/processor/less-processor')
  }
})

```

# Thinks

- https://github.com/sprity/sprity
