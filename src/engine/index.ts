export interface IEngine {
    create(tiles: ITile[], options: IEngineOptions): Promise<IEncodedImage>;
    scale(tile: ITile, ratio: number): Promise<IEncodedImage>;
}

export interface IEngineOptions {
    width: number;
    height: number;
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
