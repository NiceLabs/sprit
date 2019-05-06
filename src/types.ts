import { LayoutExported } from "layout";
import { IEngineOptions } from "./engine";
import { IProcessorOptions } from "./processor";

export interface IEngine {
    create(tiles: ITile[], options: IEngineOptions): Promise<IEncodedImage>;
    scale(tile: ITile, ratio: number): Promise<IEncodedImage>;
}

export interface ITile {
    x?: number;
    y?: number;
    offset?: number;
    width: number;
    height: number;

    scale?: number;

    contents: Buffer;
}

export interface IEncodedImage {
    contents: Buffer;

    type: string;

    width: number;
    height: number;
}

export interface IProcessor {
    extension(): string;
    handler(layout: LayoutExported, options: IProcessorOptions): Promise<string>;
}
