import type { PackResult } from 'bin-pack';
import { Options } from './engine';
import { ProcessorOptions } from './processor';

export interface Engine {
  create(tiles: Tile[], options: Options): Promise<EncodedImage>;
  scale(tile: Tile, ratio: number): Promise<EncodedImage>;
}

export interface Tile {
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

export interface SpriteExported extends PackResult<Tile> {
  sprite: Pick<EncodedImage, 'contents' | 'format'>;
}

export interface EncodedImage {
  format: string;

  width: number;
  height: number;
  contents: Buffer;
}

export interface Processor {
  extension: string;
  handler(
    layout: PackResult<Tile>,
    options: ProcessorOptions,
  ): Promise<string | Buffer>;
}

export interface ProcessorExported {
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
