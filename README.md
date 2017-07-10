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
  output: {
    processor: require('sprit/src/processor/less-processor')
  }
})

```

### Programmatic usage with Gulp

```js
const gulp = require('gulp')

gulp.task('sprite', () => {
  const options = {
    src: [
      './icons/*.png', // include files
      '!./icons/ignore-*.png' // ignore files
    ],
    output: {
      processor: require('sprit/src/processor/less-processor')
    }
  }
  return require('sprit').src(options)
    .pipe(gulp.dest('./dist'))
})
```

# Thinks

- https://github.com/sprity/sprity
