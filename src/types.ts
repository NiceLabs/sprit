import type { PackResult } from 'bin-pack';
import { IEngineOptions } from './engine';
import { IProcessorOptions } from './processor';

export interface IEngine {
  create(tiles: ITile[], options: IEngineOptions): Promise<IEncodedImage>;
  scale(tile: ITile, ratio: number): Promise<IEncodedImage>;
}

export interface ITile {
  x?: number;
  y?: number;
  offset?: number;
  scale?: number;

  width: number;
  height: number;
  contents: Buffer;

  fileName: string;
  fileType: string;

  [name: string]: any;
}

export interface ISpriteExported extends PackResult<ITile> {
  sprite: Pick<IEncodedImage, 'contents' | 'type'>;
}

export interface IEncodedImage {
  type: string;

  width: number;
  height: number;
  contents: Buffer;
}

export interface IProcessor {
  extension: string;
  handler(
    layout: PackResult<ITile>,
    options: IProcessorOptions,
  ): Promise<string | Buffer>;
}

export interface IProcessorExported {
  sprite: {
    path: string;
    contents: Buffer;
    extension: string;
  };
  metadata: {
    path: string;
    contents: Buffer;
    extension: string;
  };
}
