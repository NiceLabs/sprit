import _ from 'lodash';
import { Transform } from 'stream';
import { getEngine } from '../engine';
import { IOptions } from '../options';
import { ISpriteExported, ITile } from '../types';
import { through2obj } from './utils';

export default (
  renderer: IOptions['renderer'],
  layout: IOptions['layout'],
): Transform =>
  through2obj<ISpriteExported, ISpriteExported>(async (packed) => {
    const engine = await getEngine(renderer.engine);
    const tiles = _.map(
      packed.items,
      ({ x, y, item }): ITile => ({
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
