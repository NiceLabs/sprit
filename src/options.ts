import _ from "lodash";
import { IEngineLoader, IEngineOptions } from "./engine";
import { IProcessorLoader, IProcessorOptions } from "./processor";
import { ITile } from "./transform/tile";

export type Loader<T> = () => Promise<T | { default: T }>;

export interface IOptions {
    src?: string | string[];
    filename?: string;
    renderer?: {
        engine?: IEngineLoader;
        options?: IEngineOptions;
        scale?: (
            ((tile: ITile) => number) |
            { maximum: number; }
        );
    };
    layout?: {
        padding?: number;
        margin?: number;
    };
    output?: {
        targetPath?: string;
        processor?: IProcessorLoader;
        options?: IProcessorOptions;
    };
}

export const defaultsOptions: IOptions = {
    filename: "sprite",
    renderer: {
        engine: "jimp",
        scale: _.constant(1),
    },
    layout: {
        padding: 0,
        margin: 0,
    },
    output: {
        targetPath: process.cwd(),
        processor: "json",
    },
};
