import { Loader } from '../options';
import { Processor, Tile } from '../types';
import { useLoader } from '../utils';

const preset = {
  css: () => import('./css-processor'),
  scss: () => import('./scss-processor'),
  less: () => import('./less-processor'),
  json: () => import('./json-processor'),
};

export type ProcessorLoader = Loader<Processor> | keyof typeof preset;

export interface ProcessorOptions {
  prefix?: string;
  omitFields?: string | string[];
  naming?(tile: Tile): string;
  metadata?(tile: Tile): unknown;

  [name: string]: any;
}

export const getProcessor = async (
  loader: ProcessorLoader,
): Promise<Processor> => {
  if (typeof loader === 'string') {
    return useLoader(preset[loader]);
  }
  return useLoader(loader);
};
