# sprit

[![NPM version](https://badge.fury.io/js/sprit.svg)](http://badge.fury.io/js/sprit)

sprit features:

- Generates sprites and proper style files out of a directory of images.
- Supports multiple rendering engine (jimp)

# Installation

```bash
npm install sprit
```

# Usage

## Programmatic usage

```typescript
import sprit from "sprit";

sprit.create({
    src: [
        './icons/*.png', // include files
        '!./icons/ignore-*.png' // ignore files
    ],
});
```

## Programmatic usage with Gulp

```typescript
const gulp = require("gulp");
const sprit = require("sprit");

gulp.task("sprite", () => {
    const options = {
        src: [
            "./icons/*.png", // include files
            "!./icons/ignore-*.png" // ignore files
        ],
    };
    return sprit.src(options)
        .pipe(gulp.dest("./dist"));
});
```

# Thank

- https://github.com/sprity/sprity

# LICENSE

The MIT License (MIT)

see [LICENSE](LICENSE)
