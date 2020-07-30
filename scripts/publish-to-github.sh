#!/bin/bash
set -x

npm config list

jq '.name = "@nicelabs/sprit"' package.json > package-modified.json
mv package-modified.json package.json

VERSION=$(jq -r '.version' package.json)
npm --no-git-tag-version version "$VERSION-$GITHUB_RUN_NUMBER"
npm publish
