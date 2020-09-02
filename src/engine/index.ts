import { Loader } from '../options';
import { Engine } from '../types';
import { useLoader } from '../utils';

const preset = {
  jimp: () => import('./jimp-engine'),
  canvas: () => import('./canvas-engine'),
};

export type EngineLoader = Loader<Engine> | keyof typeof preset;

export interface Options extends UserOptions {
  width: number;
  height: number;
}

export interface UserOptions {
  format: 'png' | 'jpg';
  [key: string]: any;
}

export const getEngine = async (loader: EngineLoader): Promise<Engine> => {
  if (typeof loader === 'string') {
    return useLoader(preset[loader]);
  }
  return useLoader(loader);
};
