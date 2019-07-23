import { IEngineOptions } from "./engine";
import { IProcessorOptions } from "./processor";
import { IPacked } from "./transform/GrowingPacker";

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
}

export interface ISpriteExported extends IPacked {
    sprite: Pick<IEncodedImage, "contents" | "type">;
}

export interface IEncodedImage {
    type: string;

    width: number;
    height: number;
    contents: Buffer;
}

export interface IProcessor {
    extension: string;
    handler(layout: IPacked, options: IProcessorOptions): Promise<string | Buffer>;
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
