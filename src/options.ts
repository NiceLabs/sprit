import _ from "lodash";
import { IEngineLoader, IEngineOptions } from "./engine";
import { IProcessorLoader, IProcessorOptions } from "./processor";
import { ITile } from "./transform/1-tile";
import { basename, extname } from "path";

export type Loader<T> = () => Promise<T | { default: T }>;

export interface IOptions {
    context?: string;
    src?: string | string[];
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
        fileName?: string;
        targetPath?: string;
        processor?: IProcessorLoader;
        options?: IProcessorOptions;
    };
}

export const defaultOptions: IOptions = {
    renderer: {
        engine: "jimp",
        scale: _.constant(1),
    },
    layout: {
        padding: 0,
        margin: 0,
    },
    output: {
        processor: "json",
        fileName: "sprite",
        targetPath: process.cwd(),
        options: {
            naming({ fileName }) {
                return basename(fileName, extname(fileName))
            }
        }
    },
};
