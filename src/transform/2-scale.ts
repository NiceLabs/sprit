import _ from 'lodash';
import { Transform } from 'stream';
import { getEngine } from '../engine';
import { Options } from '../options';
import { Tile } from '../types';
import { through2obj } from './utils';

export default (renderer: Options['renderer']): Transform =>
  through2obj<Tile, Tile>(async (tile) => {
    const ratio = getScale(renderer.scale, tile);
    if (ratio === 1) {
      return tile;
    }
    const engine = await getEngine(renderer.engine);
    const scaled = await engine.scale(tile, ratio);
    return _.assign(tile, _.pick(scaled, ['width', 'height', 'contents']));
  });

const getScale = (scale: Options['renderer']['scale'], tile: Tile): number => {
  if (typeof scale === 'function') {
    return Math.max(scale(tile), 1);
  }
  return scale.maximum / Math.max(tile.width, tile.height);
};
