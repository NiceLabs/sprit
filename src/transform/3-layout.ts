import pack from 'bin-pack';
import type { Bin } from 'bin-pack';
import { Transform } from 'stream';
import { Options } from '../options';
import { through2obj } from './utils';
import { Tile } from '../types';

export interface Block extends Bin {
  item: Tile;
}

export default (layout: Options['layout']): Transform => {
  const items: Block[] = [];
  return through2obj<Tile>(
    async (tile) => {
      items.push({
        width: tile.width + layout.padding + layout.margin,
        height: tile.height + layout.padding + layout.margin,
        item: tile,
      });
    },
    async function () {
      const blocks = pack(items, { inPlace: true });
      this.push({
        width: blocks.width,
        height: blocks.height,
        items,
      });
    },
  );
};
