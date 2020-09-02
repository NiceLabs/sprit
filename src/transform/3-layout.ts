import pack from 'bin-pack';
import type { Bin } from 'bin-pack';
import { Transform } from 'stream';
import { IOptions } from '../options';
import { through2obj } from './utils';
import { ITile } from '../types';

export interface IBlock extends Bin {
  item: ITile;
}

export default (layout: IOptions['layout']): Transform => {
  const items: IBlock[] = [];
  return through2obj<ITile>(
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
