#!/usr/bin/env node
const argv = require('yargs')
  .usage('$0 --src ...')
  .demand([ 'src' ])
  .help()
  .argv

require('../src').create({
  src: argv.src
})
