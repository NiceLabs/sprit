import _ from 'lodash';
import { basename, extname } from 'path';
import { EngineLoader, UserOptions as EngineUserOptions } from './engine';
import { ProcessorLoader, ProcessorOptions } from './processor';
import { Tile } from './types';

export type Loader<T> = () => Promise<T | { default: T }>;

export interface Options {
  context?: string;
  src?: string | string[];
  renderer?: {
    engine?: EngineLoader;
    options?: EngineUserOptions;
    scale?: ((tile: Tile) => number) | { maximum: number };
  };
  layout?: {
    padding?: number;
    margin?: number;
  };
  output?: {
    fileName?: string;
    processor?: ProcessorLoader;
    options?: ProcessorOptions;
  };
}

export const defaultOptions: Options = {
  context: process.cwd(),
  renderer: {
    engine: 'jimp',
    scale: _.constant(1),
  },
  layout: {
    padding: 0,
    margin: 0,
  },
  output: {
    processor: 'json',
    fileName: 'sprite',
    options: {
      naming({ fileName }: Tile): string {
        return basename(fileName, extname(fileName));
      },
    },
  },
};
