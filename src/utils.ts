import type { PackedItem, PackResult } from 'bin-pack';
import { Loader } from './options';
import { ITile } from './types';

export const useLoader = async <T>(loader: Loader<T>): Promise<T> => {
  const loaded: any = await loader();
  return (loaded.default as T) ?? (loaded as T);
};

export const getBackgroundPosition = (
  packed: PackResult<ITile>,
  block: PackedItem<ITile>,
): string => {
  // see http://www.jingjingke.com/c/28134.html
  const values = [
    block.x / (packed.width - block.width) || 0,
    block.y / (packed.height - block.height) || 0,
  ];
  return values.map(toPercent).join(' ');
};

export const getBackgroundSize = (
  packed: PackResult<ITile>,
  block: PackedItem<ITile>,
): string => {
  // see http://www.jingjingke.com/c/28134.html
  const values = [packed.width / block.width, packed.height / block.height];
  return values.map(toPercent).join(' ');
};

const toPercent = (value: number) => `${Number((value * 100).toFixed(6))}%`;
