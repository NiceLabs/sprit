import _ from 'lodash';
import { Transform } from 'stream';
import { getEngine } from '../engine';
import { Options } from '../options';
import { SpriteExported, Tile } from '../types';
import { through2obj } from './utils';

export default (
  renderer: Options['renderer'],
  layout: Options['layout'],
): Transform =>
  through2obj<SpriteExported, SpriteExported>(async (packed) => {
    const engine = await getEngine(renderer.engine);
    const tiles = _.map(
      packed.items,
      ({ x, y, item }): Tile => ({
        x,
        y,
        offset: layout.padding,
        width: item.width,
        height: item.height,
        contents: item.contents,
        fileName: item.fileName,
        fileType: item.fileType,
      }),
    );
    const sprite = await engine.create(
      tiles,
      _.defaults(renderer.options, {
        width: packed.width,
        height: packed.height,
        format: 'png',
      }),
    );
    packed.sprite = _.pick(sprite, ['contents', 'format']);
    return packed;
  });
